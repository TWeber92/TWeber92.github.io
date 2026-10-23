import { HeaderDTO } from "../weber-profile-dto/HeaderDTO.js";
import { Header } from "../weber-profile-entity/Header.js";
import { HeaderView } from "../weber-profile-view/HeaderView.js";

export class HeaderService {
  constructor(repo, browser) {
    this.#repo = repo;
    this.#browser = browser;
  }

  #repo;
  #browser;

  getHeaderContext() {
    const header = this.#repo.entity.header.children;
    const buttons = this.#repo.getButtonsFromEntity();
    const entity = Header.from({
      header: this.#repo.entity.header,
      mobile: this.#repo.entity.nav,
      menu: header.menu,
      hamburger: header.hamburger,
      buttons,
    });
    return HeaderDTO.from(entity.to());
  }
  putContextInHeader() {
    const { headerContext, headerBtns } = HeaderView.from({});
    const context = this.#repo.getHeaderContextWithHtml(headerContext);
    const buttons = this.#repo.getHeaderContextWithHtml(headerBtns);
    const entity = Header.from({
      title: context.title,
      menu: context.menu,
      hamburger: context.hamburger,
      mobile: context.navMenu,
      buttons,
    }).to();
    this.#repo.putHeaderAssemblyTogether(entity);
  }

  putMenuNavOnOffDisplay(menuBtn) {
    const buttons = this.#repo.getButtonsFromEntity();
    this.#repo.putMenuNavOnOffDisplay(buttons);
    this.putNewIconInHeader(menuBtn);
  }
  putNewIconInHeader(menuBtn) {
    this.#repo.putNewMenuButtonInHeader(menuBtn);
  }
}
