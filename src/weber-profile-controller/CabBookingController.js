import { AppController } from "./AppController.js";

export class CabBookingController extends AppController {
  constructor(service) {
    super();
    this.#service = service;
  }

  #service;

  putCabBookingProjectInSlide(req, res) {
    super.PUT(req, res, () =>
      this.#service.putCabBookingProjectInSlide(
        req.body.button,
        req.body.carousel.slides,
      ),
    );
  }
}
