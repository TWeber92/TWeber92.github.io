export class Header {
  #title;
  #menu;
  #hamburger;
  #mobile;
  #buttons;
  #header;

  constructor(data) {
    this.#header = data.header;
    this.#title = data.title;
    this.#menu = data.menu;
    this.#hamburger = data.hamburger;
    this.#mobile = data.mobile;
    this.#buttons = {
      about: data.buttons.about,
      contact: data.buttons.contact,
    };
  }

  to() {
    return {
      header: this.#header,
      title: this.#title,
      menu: this.#menu,
      hamburger: this.#hamburger,
      mobile: this.#mobile,
      buttons: this.#buttons,
    };
  }
  static from(data) {
    return new Header(data);
  }
}