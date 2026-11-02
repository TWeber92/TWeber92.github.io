export class Hierarchy {
  #parent;
  #children;
  
  constructor(data) {
    this.#parent = data.parent;
    this.#children = data.children;
  }

  to() {
    return {
      parent: this.#parent,
      children: this.#children,
    };
  }

  static from(data) {
    return new Hierarchy(data);
  }
}
