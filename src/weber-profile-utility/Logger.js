export class Logger {
  // The registry holding all subscribers
  static #listeners = new Map();

  // Subscribe to an event
  static on(eventName, callback) {
    if (!this.#listeners.has(eventName)) {
      this.#listeners.set(eventName, []);
    }
    this.#listeners.get(eventName).push(callback);
  }

  // Publish an event
  static emit(eventName, data) {
    if (!this.#listeners.has(eventName)) return;
    this.#listeners.get(eventName).forEach((callback) => callback(data));
  }

  // Built-in subscribers (call this once in Application.js)
  static setup() {
    // Listen for "error" events
    Logger.on("error", (data) => {
      const entry = Logger.log(data.message, data.meta);
      console.error(`🔴 [ERROR] ${entry}`);
    });

    // Listen for "info" events
    Logger.on("info", (data) => {
      const entry = Logger.log(data.message, data.meta);
      console.info(`🔵 [INFO] ${entry}`);
    });
  }

  // Helper to format the log
  static log(message, metadata = {}) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      message,
      ...metadata,
    });
  }
}