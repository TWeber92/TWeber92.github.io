export class MavenLibraryController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  async getLibraryBooks(req, res) {
    const { project, method, endpoint } = req.body;
    const result = await this.#service.getLibraryBooks(
      project,
      method,
      endpoint,
    );
    res.obj(result || null);
  }

  putMavenLibraryProjectInSlide(req, res) {
    this.#service.putMavenLibraryProjectInSlide(
      req.body.button,
      req.body.carousel.slides,
    );
    res.obj(null);
  }
}
