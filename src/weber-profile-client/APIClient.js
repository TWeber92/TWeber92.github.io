import { STATUS_TEXT } from "../weber-profile-enum/StatusTextDictionary.js";
import { APIError } from "../weber-profile-exception/WeberProfileError.js";
import { Logger } from "../weber-profile-utility/Logger.js";

export class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async API(endpoint, method, { headers = {}, body } = {}) {
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        credentials: "include",
        body,
      });
      const contentType = response.headers.get("content-type");
      let data = null;
      if (contentType?.includes("application/json"))
        data = await response.json();
      else data = await response.text();
      const statusText = STATUS_TEXT[response.status];
      if (!response.ok && response.status < 500) {
        Logger.emit("info", {
          message: `HTTP ${response.status}`,
          meta: { data, info: statusText },
        });
        return {
          info: statusText || "Request failed",
          status: response.status,
          data,
        };
      }
      if (response.status >= 500) {
        Logger.emit("error", {
          message: `Internal Server Error ${method} ${url}`,
          meta: { error: statusText },
        });
        return {
          error: statusText || "Internal Server Error",
          status: response.status,
          data,
          server: new APIError(
            statusText || "Internal Server Error",
            "ServerError",
            `${method} ${endpoint}`,
            response.status,
          ),
        };
      }
      return data;
    } catch (error) {
      Logger.emit("error", {
        message: `Network failure on ${method} ${url}`,
        meta: { error: error.message || STATUS_TEXT[502] },
      });
      new APIError(
        error.message || STATUS_TEXT[502] || "Network Error",
        "NetworkError",
        `${method} ${endpoint}`,
        500,
      ).toToast();
    }
  }

  GET(endpoint, method = "GET", headers = {}, dto = null) {
    const options = { headers };
    if (dto) options.body = JSON.stringify(dto);
    return this.API(endpoint, method, options);
  }

  POST(endpoint, method = "POST", headers = {}, dto) {
    return this.API(endpoint, method, { body: JSON.stringify(dto), headers });
  }

  PUT(endpoint, method = "PUT", headers = {}, dto) {
    return this.API(endpoint, method, { body: JSON.stringify(dto), headers });
  }

  DELETE(endpoint, method = "DELETE", headers = {}, dto = null) {
    const options = { headers };
    if (dto) options.body = JSON.stringify(dto);
    return this.API(endpoint, method, options);
  }
}
