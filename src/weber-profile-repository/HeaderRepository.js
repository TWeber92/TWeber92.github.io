import { HtmlStore } from "../HtmlStore.js";
import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class HeaderRepository extends DocumentClient {
  constructor(view) {
    super();
    this.#entity = view.entity;
  }

  #entity;

  getHeaderContextWithHtml(html) {
    return super.GET(html, (t) => HtmlStore.from(t).nodes);
  }

  getButtonsFromEntity() {
    return super.GET(this.#entity, ({ nav, menu }) =>
      !nav.hidden ? nav.children : menu.children,
    );
  }

  putHeaderAssemblyTogether(entity) {
    super.PUT(entity, ({ title, menu, hamburger, mobile, buttons }) => {
      menu.append(...Object.values(buttons)); //buttons needs to be converted to iterable
      const { header } = this.#entity;
      header.append(title, menu, hamburger);
      header.after(mobile);
      this.#entity.menu = menu;
      this.#entity.nav = mobile;
    });
  }
  putNewMenuButtonInHeader(menuBtn) {
    super.PUT(
      menuBtn,
      (mb) => (mb.textContent = this.#entity.nav.hidden ? "🍔" : "❌"),
    );
  }

  putMenuNavOnOffDisplay(buttons) {
    super.PUT(buttons, (btns) => {
      const { nav, menu } = this.#entity;
      const hidden = nav.hidden;
      nav.hidden = hidden ? false : true;
      nav.hidden ? menu.append(...btns) : nav.append(...btns);
      document.body.dataset.overlay = nav.hidden ? "false" : "true";
    });
  }
}
