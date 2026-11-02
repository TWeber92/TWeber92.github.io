import { AppController } from "./AppController.js";

export class IoTSiteWiseController extends AppController {
  constructor(service) {
    super();
    this.#service = service;
  }

  #service;

  async putSitewiseProjectInSlide(req, res) {
    super.PUT(req, res, async () =>
      await this.#service.putIoTSiteWiseProjectInSlide(
        req.body.button,
        req.body.carousel.slides,
      ),
    );
  }
}
