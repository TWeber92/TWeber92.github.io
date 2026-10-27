import { AppController } from "./AppController.js";

export class AuthorsNovelsController extends AppController {
  constructor(service) {
    super();
    this.#service = service;
  }

  #service;

  putAuthorsNovelsProjectInSlide(req, res) {
    super.PUT(req, res, () =>
      this.#service.putAuthorsNovelsProjectInSlide(
        req.body.button,
        req.body.carousel.slides,
      ),
    );
  }
}
