import { CoinCollectionError } from "./weber-profile-exception/WeberProfileError.js";

export class View {
  #views = {};

  constructor() {
    CoinCollectionError.postErrorNode()
  }

  get views() {
    return this.#views;
  }
}