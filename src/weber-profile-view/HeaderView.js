import { DocumentStore } from "../DocumentStore.js";

export class HeaderView {
  #headerContext;
  #headerBtns;

  constructor(data) {
    this.#html = data;
  }

  get entity() {
    return { header: this.#getHeaderElement() };
  }

  #getHeaderElement() {
    return document.body.appendChild(
      DocumentStore.createHeaderElement({
        id: "header",
        className: "doc-header",
      }).node,
    );
  }

  set #html(_) {
    this.#headerContext = `
      <h3 id="title">Rad Tad</h3>
      <menu id="menu" class="nav-desktop" aria-label="Main navigation"></menu>
      <button id="hamburger" class="menu-hamburger" aria-label="Toggle menu">
        🍔
      </button>
      <nav id="navMenu" class="nav-mobile" hidden aria-label="Mobile navigation"></nav>
    `;
    this.#headerBtns = `
        <button id="about" data-nav-item class="nav-item">
          👤About
        </button>
        <button id="contact"data-nav-item class="nav-item">
          🔎Contact
        </button>`;
  }

  #to() {
    return {
      headerContext: this.#headerContext,
      headerBtns: this.#headerBtns,
    };
  }
  static from(data) {
    return new HeaderView(data).#to();
  }
}
