import { event } from "../weber-profile-functions.js";

export class EventRegister {
  constructor() {
    this.#registerListeners();
  }
  #registerListeners() {
    this.#registerClickListener();
    this.#registerInputListener();
    this.#registerSubmitListener();
    this.#registerPointerListeners();
    this.#registerLoadedListener();
  }

  #registerClickListener() {
    document.addEventListener("click", async (e) => {
      if (e.target.nodeType !== 1) return;
      await event(e);
    });
  }
  #registerInputListener() {
    document.addEventListener("input", async (e) => {
      if (e.target.nodeType !== 1) return;
      await event(e);
    });
  }
  #registerSubmitListener() {
    document.addEventListener("submit", async (e) => {
      e.preventDefault();
      await event(e);
    });
  }
  async #registerPointerListeners() {
    document.addEventListener("mouseover", async (e) => {
      if (e.target.nodeType !== 1) return;
      await event(e);
    });
    document.addEventListener("mouseout", async (e) => {
      if (e.target.nodeType !== 1) return;
      await event(e);
    });
  }
  async #registerLoadedListener() {
    window.addEventListener(
      "load",
      async (e) => await event(this.#patchEvent(e, "UI", "update")),
    );
  }
  #patchEvent(e, tagName, id) {
    e.composedPath = () => [{ tagName, id }];
    return e;
  }
}