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

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw { status: response.status, data };
      }

      return data;
    } catch (error) {
      console.error("APIClient error:", error);
      throw error;
    }
  }

  GET(endpoint, dto = null, headers = {}) {
    const options = { headers };
    if (dto) options.body = JSON.stringify(dto);
    return this.API(endpoint, "GET", options);
  }

  POST(endpoint, dto, headers = {}) {
    return this.API(endpoint, "POST", { body: JSON.stringify(dto), headers });
  }

  PUT(endpoint, dto, headers = {}) {
    return this.API(endpoint, "PUT", { body: JSON.stringify(dto), headers });
  }

  DELETE(endpoint, dto = null, headers = {}) {
    const options = { headers };
    if (dto) options.body = JSON.stringify(dto);
    return this.API(endpoint, "DELETE", options);
  }
}
