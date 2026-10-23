export class DocumentStore {
  constructor(element, options) {
    Object.assign(element, options);
    this.element = element;
  }

  get node() {
    return this.element;
  }

  
  static createDivElement(attributes) {
    const { element, options } = DocumentStore.#setOptions(
      document.createElement("div"),
      attributes,
    );
    return new DocumentStore(element, options);
  }


  static #setOptions(element, attributes) {
    if (attributes.data)
      Object.entries(attributes.data).forEach(
        ([key, value]) => (element.dataset[key] = value),
      );
    return {
      element,
      options: {
        id: attributes.id,
        className: attributes.className,
        hidden: attributes.hidden,
      },
    };
  }
}
