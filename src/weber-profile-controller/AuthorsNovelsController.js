export class AuthorsNovelsController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  async getAllAuthors(req, res) {
    const { project, method, endpoint } = req.body;
    const result = await this.#service.getAllAuthors(project, method, endpoint);
    res.obj(result || null);
  }

  async getNovelsByAuthorName(req, res) {
    const { project, method, endpoint, parameter } = req.body;
    const result = await this.#service.getNovelsByAuthorName(
      project,
      method,
      endpoint,
      parameter,
    );
    res.obj(result || null);
  }

  async getNovelsByAuthorAndYear(req, res) {
    const { project, method, endpoint, parameter } = req.body;
    const result = await this.#service.getNovelsByAuthorAndYear(
      project,
      method,
      endpoint,
      parameter,
    );
    res.obj(result || null);
  }

  async postAuthorToNovels(req, res) {
    const { project, method, endpoint, payload } = req.body;
    const result = await this.#service.postAuthorToNovels(
      project,
      method,
      endpoint,
      payload,
    );
    res.obj(result || null);
  }

  async postNovelToCollection(req, res) {
    const { project, method, endpoint, payload } = req.body;
    const result = await this.#service.postNovelToCollection(
      project,
      method,
      endpoint,
      payload,
    );
    res.obj(result || null);
  }

  async putNewAuthorNameById(req, res) {
    const { project, method, endpoint, parameter } = req.body;
    const result = await this.#service.putNewAuthorNameById(
      project,
      method,
      endpoint,
      parameter,
    );
    res.obj(result || null);
  }

  async putNovelData(req, res) {
    const { project, method, endpoint, payload } = req.body;
    const result = await this.#service.putNovelData(
      project,
      method,
      endpoint,
      payload,
    );
    res.obj(result || null);
  }

  async putAuthorsNovelsProjectInSlide(req, res) {
    const { button, carousel } = req.body;
    await this.#service.putAuthorsNovelsProjectInSlide(button, carousel.slides);
    res.obj(null);
  }

  async deleteAuthor(req, res) {
    const { project, method, endpoint, parameter } = req.body;
    const result = await this.#service.deleteAuthor(
      project,
      method,
      endpoint,
      parameter,
    );
    res.obj(result || null);
  }

  async deleteNovel(req, res) {
    const { project, method, endpoint, parameter } = req.body;
    const result = await this.#service.deleteNovel(
      project,
      method,
      endpoint,
      parameter,
    );
    res.obj(result || null);
  }
}
