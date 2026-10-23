export class HeaderDTO {
  #header;
  #menu;
  #hamburger;
  #mobile;
  #buttons;
  constructor(data) {
    this.#header = data.header;
    this.#menu = data.menu;
    this.#hamburger = data.hamburger;
    this.#mobile = data.mobile;
    this.#buttons = data.buttons;
  }

  to() {
    return {
      header: this.#header,
      menu: this.#menu,
      hamburger: this.#hamburger,
      mobile: this.#mobile,
      buttons: this.#buttons,
    };
  }
  static from(data) {
    return new HeaderDTO(data);
  }
}