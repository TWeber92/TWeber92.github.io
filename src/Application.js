import { HeaderController } from "./weber-profile-controller/HeaderController.js";
import { HeaderRepository } from "./weber-profile-repository/HeaderRepository.js";
import { HeaderService } from "./weber-profile-service/HeaderService.js";

export class Application {
  static #controllers = {};

  constructor() {
    const views = Application.viewInstance.views;
    const controllers = Application.#controllers;
    controllers.headerController = this.#buildHeader(views.headerView);
  }

  static get controllers() {
    return Application.#controllers;
  }

  static viewInstance;

  #buildHeader(view) {
    const repo = new HeaderRepository(view);
    const service = new HeaderService(repo);
    return new HeaderController(service);
  }
}
