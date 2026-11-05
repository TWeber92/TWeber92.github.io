export class IoTSiteWiseController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  async putSitewiseProjectInSlide(req, res) {
    await this.#service.putIoTSiteWiseProjectInSlide(
      req.body.button,
      req.body.carousel.slides,
    );
    res.obj(null);
  }
}
