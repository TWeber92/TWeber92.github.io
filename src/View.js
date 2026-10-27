import { CoinCollectionError } from "./weber-profile-exception/WeberProfileError.js";
import { CarouselView } from "./weber-profile-view/CarouselView.js";
import { HeaderView } from "./weber-profile-view/HeaderView.js";
import { ProjectView } from "./weber-profile-view/ProjectView.js";

export class View {
  #views = {};

  constructor() {
    CoinCollectionError.postErrorNode()
    this.#views.headerView = new HeaderView({})
    this.#views.carouselView = new CarouselView({})
    this.#views.projectView = new ProjectView({})
  }

  get views() {
    return this.#views;
  }
}