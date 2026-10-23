import { CoinCollectionError } from "./weber-profile-exception/WeberProfileError.js";
import { HeaderView } from "./weber-profile-view/HeaderView.js";

export class View {
  #views = {};

  constructor() {
    CoinCollectionError.postErrorNode()
    this.#views.headerView = new HeaderView({})
  }

  get views() {
    return this.#views;
  }
}