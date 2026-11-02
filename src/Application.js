import { APIClient } from "./weber-profile-client/APIClient.js";
import { AuthorsNovelsController } from "./weber-profile-controller/AuthorsNovelsController.js";
import { CabBookingController } from "./weber-profile-controller/CabBookingController.js";
import { CarouselController } from "./weber-profile-controller/CarouselController.js";
import { CoinApiController } from "./weber-profile-controller/CoinApiController.js";
import { HeaderController } from "./weber-profile-controller/HeaderController.js";
import { IoTSiteWiseController } from "./weber-profile-controller/IoTSiteWiseController.js";
import { MavenLibraryController } from "./weber-profile-controller/MavenLibraryController.js";
import { ProjectController } from "./weber-profile-controller/ProjectController.js";
import { SpringSecurityController } from "./weber-profile-controller/SpringSecurityController.js";
import { CloudFlareBaseUrls } from "./weber-profile-enum/CloudFlareBaseUrls.js";
import { RenderBaseUrls } from "./weber-profile-enum/RenderBaseUrls.js";
import { AuthorsNovelsRepository } from "./weber-profile-repository/AuthorsNovelsRepository.js";
import { CabBookingRepository } from "./weber-profile-repository/CabBookingRepository.js";
import { CarouselRepository } from "./weber-profile-repository/CarouselRepository.js";
import { CoinApiRepository } from "./weber-profile-repository/CoinApiRepository.js";
import { HeaderRepository } from "./weber-profile-repository/HeaderRepository.js";
import { IoTSiteWiseRepository } from "./weber-profile-repository/IoTSiteWiseRepository.js";
import { MavenLibraryRepository } from "./weber-profile-repository/MavenLibraryRepository.js";
import { ProjectRepository } from "./weber-profile-repository/ProjectRepository.js";
import { SpringSecurityRepository } from "./weber-profile-repository/SpringSecurityRepository.js";
import { AuthorsNovelsService } from "./weber-profile-service/AuthorsNovelsService.js";
import { CabBookingService } from "./weber-profile-service/CabBookingService.js";
import { CarouselService } from "./weber-profile-service/CarouselService.js";
import { HeaderService } from "./weber-profile-service/HeaderService.js";
import { IoTSiteWiseService } from "./weber-profile-service/IoTSiteWiseService.js";
import { MavenLibraryService } from "./weber-profile-service/MavenLibraryService.js";
import { ProjectService } from "./weber-profile-service/ProjectService.js";
import { SpringSecurityService } from "./weber-profile-service/SpringSecurityService.js";

export class Application {
  static #controllers = {};
  #clients = {};

  constructor() {
    const views = Application.viewInstance.views;
    const controllers = Application.#controllers;
    this.#buildClients();
    controllers.headerController = this.#buildHeader(views.headerView);
    controllers.carouselController = this.#buildCarousel(views.carouselView);
    controllers.projectController = this.#buildProject(views.projectView);
  }

  static get controllers() {
    return Application.#controllers;
  }

  static viewInstance;

  #buildClients() {
    const baseUrls = {
      springSecurity: RenderBaseUrls.SPRING_SECURITY,
      cabBooking: RenderBaseUrls.CAB_BOOKING,
      authorsNovels: RenderBaseUrls.AUTHORS_NOVELS,
      mavenLibrary: RenderBaseUrls.MAVEN_LIBRARY,
      iotSitewise: RenderBaseUrls.IOT_SITEWISE,
      coinApi: CloudFlareBaseUrls.COIN_API,
      profileApi: CloudFlareBaseUrls.PROFILE_API,
    };

    for (const [key, val] of Object.entries(baseUrls))
      this.#clients[key] = new APIClient(val);
  }

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
    controllers.springSecurityController = this.#buildSpringSecurity(
      view,
      repo,
    );
    controllers.authorsNovelsController = this.#buildAuthorsNovels(view, repo);
    controllers.cabBookingController = this.#buildCabBooking(view, repo);
    controllers.mavenLibraryController = this.#buildMavenLibrary(view, repo);
    controllers.iotSiteWiseController = this.#buildIoTSiteWise(view, repo);
    controllers.coinApiController = this.#buildCoinApi(view, repo);
    const service = new ProjectService(repo);
    return new ProjectController(service);
  }

  #buildSpringSecurity(view, pRepo) {
    const repo = new SpringSecurityRepository(
      view,
      this.#clients.springSecurity,
      this.#clients.profileApi,
    );
    const service = new SpringSecurityService(repo, pRepo);
    return new SpringSecurityController(service);
  }

  #buildAuthorsNovels(view, pRepo) {
    const repo = new AuthorsNovelsRepository(
      view,
      this.#clients.authorsNovels,
      this.#clients.profileApi,
    );
    const service = new AuthorsNovelsService(repo, pRepo);
    return new AuthorsNovelsController(service);
  }

  #buildCabBooking(view, pRepo) {
    const repo = new CabBookingRepository(
      view,
      this.#clients.cabBooking,
      this.#clients.profileApi,
    );
    const service = new CabBookingService(repo, pRepo);
    return new CabBookingController(service);
  }

  #buildMavenLibrary(view, pRepo) {
    const repo = new MavenLibraryRepository(
      view,
      this.#clients.mavenLibrary,
      this.#clients.profileApi,
    );
    const service = new MavenLibraryService(repo, pRepo);
    return new MavenLibraryController(service);
  }
  #buildIoTSiteWise(view, pRepo) {
    const repo = new IoTSiteWiseRepository(view, this.#clients.iotSitewise);
    const service = new IoTSiteWiseService(repo, pRepo);
    return new IoTSiteWiseController(service);
  }
  #buildCoinApi(view, pRepo) {
    const repo = new CoinApiRepository(
      view,
      this.#clients.coinApi,
      this.#clients.profileApi,
    );
    const service = new CoinApiRepository(repo, pRepo);
    return new CoinApiController(service);
  }
}
