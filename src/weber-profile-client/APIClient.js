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
      if (contentType?.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) throw response;
        return data;
      }
    } catch (error) {
      console.error("APIClient error:", error);
      throw error;
    }
  }
  GET(endpoint) {
    return this.API(endpoint, "GET");
  }
  POST(endpoint, dto) {
    return this.API(endpoint, "POST", { body: JSON.stringify(dto) });
  }
  PUT(endpoint, dto) {
    return this.API(endpoint, "PUT", { body: JSON.stringify(dto) });
  }
  DELETE(endpoint, id) {
    return this.API(endpoint, "DELETE", id);
  }
}
