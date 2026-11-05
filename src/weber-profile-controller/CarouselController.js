export class CarouselController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  getCarouselSlides(req, res) {
    const data = this.#service.getCarouselSlides(req);
    res.obj(data);
  }
  putCarouselAssemblyinNav(req, res) {
    this.#service.putCarouselAssemblyinNav(req);
    res.obj(null);
  }

  postPreviousProjectSlide(req, res) {
    this.#service.postPreviousProjectSlide(req);
    res.obj(null);
  }
  postNextProjectSlide(req, res) {
    this.#service.postNextProjectSlide(req);
    res.obj(null);
  }
}
