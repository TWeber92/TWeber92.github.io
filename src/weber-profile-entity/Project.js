export class Project {
  #slide;
  #terminal;
  #project;
  #tables;
  #client;

  constructor(data) {
    this.#slide = data.slide;
    this.#terminal = data.terminal;
    this.#project = data.project;
    this.#tables = data.tables;
    this.#client = data.client;
  }

  to() {
    return {
      slide: this.#slide,
      terminal: this.#terminal,
      project: this.#project,
      tables: this.#tables,
      client: this.#client,
    };
  }

  static from(data) {
    return new Project(data);
  }
}
