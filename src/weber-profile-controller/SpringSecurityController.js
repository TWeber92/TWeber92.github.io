import { AppController } from "./AppController.js";

export class SpringSecurityController extends AppController {
  constructor(service) {
    super();
    this.#service = service;
  }

  #service;

  putSpringSecurityProjectInSlide(req, res) {
    super.PUT(req, res, () =>
      this.#service.putSpringSecurityProjectInSlide(
        req.body.button,
        req.body.carousel.slides,
      ),
    );
  }
}
