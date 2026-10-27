import { AppController } from "./AppController.js";

export class MavenLibraryController extends AppController {
  constructor(service) {
    super();
    this.#service = service;
  }

  #service;

  putMavenLibraryProjectInSlide(req, res) {
    super.PUT(req, res, () =>
      this.#service.putMavenLibraryProjectInSlide(
        req.body.button,
        req.body.carousel.slides,
      ),
    );
  }
}
