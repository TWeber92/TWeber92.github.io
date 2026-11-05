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
      // Graceful DB Error (e.g., 400, 401, 404)
      if (!response.ok && response.status < 500) {
        Logger.emit("warn", {
          message: `HTTP ${response.status}`,
          meta: { data },
        });
        return {
          message: data?.message || "Request failed",
          status: response.status,
          data,
        };
      }
      if (response.status >= 500) {
        throw new APIError(
          data?.message || "Internal Server Error",
          "ServerError",
          `${method} ${endpoint}`,
          response.status,
        );
      }
      return data;
    } catch (error) {
      // Network Failure / Catch Block
      if (error instanceof APIError) throw error; // Re-throw if we just made it
      Logger.emit("error", {
        message: `Network failure on ${method} ${url}`,
        meta: { error: error.message },
      });
      throw new APIError(
        error.message || "Network Error",
        "NetworkError",
        `${method} ${endpoint}`,
        500,
      );
    }
  }

  GET(endpoint, method = "GET", headers = {}, dto = null) {
    const options = { headers };
    if (dto) options.body = JSON.stringify(dto);
    return this.API(endpoint, method, options);
  }

  POST(endpoint, method = "POST", dto, headers = {}) {
    return this.API(endpoint, method, { body: JSON.stringify(dto), headers });
  }

  PUT(endpoint, method = "PUT", dto, headers = {}) {
    return this.API(endpoint, method, { body: JSON.stringify(dto), headers });
  }

  DELETE(endpoint, method = "DELETE", headers = {}, dto = null) {
    const options = { headers };
    if (dto) options.body = JSON.stringify(dto);
    return this.API(endpoint, method, options);
  }
}
