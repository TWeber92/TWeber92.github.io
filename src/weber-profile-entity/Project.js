export class Project {
  #slide;
  #terminal;
  #project;
  #canvas;
  #client;
  #options;

  constructor(data) {
    this.#slide = data.slide;
    this.#terminal = data.terminal;
    this.#project = data.project;
    this.#canvas = data.canvas;
    this.#client = data.client;
    this.#options = data.options;
  }

  to() {
    return {
      slide: this.#slide,
      terminal: this.#terminal,
      project: this.#project,
      canvas: this.#canvas,
      client: this.#client,
      options: this.#options,
    };
  }

  static from(data) {
    return new Project(data);
  }
}
