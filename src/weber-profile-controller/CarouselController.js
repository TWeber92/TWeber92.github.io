import { AppController } from "./AppController.js";

export class CarouselController extends AppController {
  constructor(service) {
    super();
    this.#service = service;
  }

  #service;

  getCarouselSlides(req, res) {
    return super.GET(req, res, () => this.#service.getCarouselSlides());
  }
  putCarouselAssemblyinNav(req, res) {
    super.PUT(req, res, () => this.#service.putCarouselAssemblyinNav());
  }
}
