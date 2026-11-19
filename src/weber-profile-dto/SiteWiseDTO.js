export class SiteWiseDTO {
  #parent;
  #children;
  
  constructor(data) {
    this.#parent = data;
    this.#children = data.children;
  }

  to() {
    return {
      parent: {
        id: this.#parent.id,
        name: this.#parent.name,
        properties: this.#parent.properties
      },
      children: this.#children,
    };
  }

  static from(data) {
    return new SiteWiseDTO(data);
  }
}