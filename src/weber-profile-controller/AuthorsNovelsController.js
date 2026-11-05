export class AuthorsNovelsController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  async getAllAuthors(req, res) {
    const result = await this.#service.getAllAuthors(
      req.body.project,
      req.body.method,
      req.body.endpoint,
    );
    res.obj(result || null);
  }

  putAuthorsNovelsProjectInSlide(req, res) {
    this.#service.putAuthorsNovelsProjectInSlide(
      req.body.button,
      req.body.carousel.slides,
    );
    res.obj(null);
  }
}
