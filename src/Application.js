import { AuthorsNovelsController } from "./weber-profile-controller/AuthorsNovelsController.js";
import { CabBookingController } from "./weber-profile-controller/CabBookingController.js";
import { CarouselController } from "./weber-profile-controller/CarouselController.js";
import { HeaderController } from "./weber-profile-controller/HeaderController.js";
import { MavenLibraryController } from "./weber-profile-controller/MavenLibraryController.js";
import { ProjectController } from "./weber-profile-controller/ProjectController.js";
import { SpringSecurityController } from "./weber-profile-controller/SpringSecurityController.js";
import { AuthorsNovelsRepository } from "./weber-profile-repository/AuthorsNovelsRepository.js";
import { CabBookingRepository } from "./weber-profile-repository/CabBookingRepository.js";
import { CarouselRepository } from "./weber-profile-repository/CarouselRepository.js";
import { HeaderRepository } from "./weber-profile-repository/HeaderRepository.js";
import { MavenLibraryRepository } from "./weber-profile-repository/MavenLibraryRepository.js";
import { ProjectRepository } from "./weber-profile-repository/ProjectRepository.js";
import { SpringSecurityRepository } from "./weber-profile-repository/SpringSecurityRepository.js";
import { AuthorsNovelsService } from "./weber-profile-service/AuthorsNovelsService.js";
import { CabBookingService } from "./weber-profile-service/CabBookingService.js";
import { CarouselService } from "./weber-profile-service/CarouselService.js";
import { HeaderService } from "./weber-profile-service/HeaderService.js";
import { MavenLibraryService } from "./weber-profile-service/MavenLibraryService.js";
import { ProjectService } from "./weber-profile-service/ProjectService.js";
import { SpringSecurityService } from "./weber-profile-service/SpringSecurityService.js";

export class Application {
  static #controllers = {};

  constructor() {
    const views = Application.viewInstance.views;
    const controllers = Application.#controllers;
    controllers.headerController = this.#buildHeader(views.headerView);
    controllers.carouselController = this.#buildCarousel(views.carouselView);

    controllers.projectController = this.#buildProject(views.projectView);
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
  #buildCarousel(view) {
    const repo = new CarouselRepository(view);
    const service = new CarouselService(repo);
    return new CarouselController(service);
  }
  #buildProject(view) {
    const controllers = Application.#controllers;
    const repo = new ProjectRepository(view);
    controllers.springSecurityController = this.#buildSpringSecurity(view, repo);
    controllers.authorsNovelsController = this.#buildAuthorsNovels(view, repo);
    controllers.cabBookingController = this.#buildCabBooking(view, repo);
    controllers.mavenLibraryController = this.#buildMavenLibrary(view, repo);
    const service = new ProjectService(repo);
    return new ProjectController(service);
  }

  #buildSpringSecurity(view, pRepo) {
    const repo = new SpringSecurityRepository(view);
    const service = new SpringSecurityService(repo, pRepo);
    return new SpringSecurityController(service);
  }

  #buildAuthorsNovels(view, pRepo) {
    const repo = new AuthorsNovelsRepository(view);
    const service = new AuthorsNovelsService(repo, pRepo);
    return new AuthorsNovelsController(service);
  }

  #buildCabBooking(view, pRepo) {
    const repo = new CabBookingRepository(view);
    const service = new CabBookingService(repo, pRepo);
    return new CabBookingController(service);
  }

  #buildMavenLibrary(view, pRepo) {
    const repo = new MavenLibraryRepository(view);
    const service = new MavenLibraryService(repo, pRepo);
    return new MavenLibraryController(service);
  }
}
