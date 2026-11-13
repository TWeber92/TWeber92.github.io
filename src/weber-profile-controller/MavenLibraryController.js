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
  async getLibraryMembers(req, res) {
    const { project, method, endpoint } = req.body;
    const result = await this.#service.getLibraryMembers(
      project,
      method,
      endpoint,
    );
    res.obj(result || null);
  }

  async getMemberByIsbn(req, res) {
    const { project, method, endpoint, payload } = req.body;
    const result = await this.#service.getMemberByIsbn(
      project,
      method,
      endpoint,
      payload,
    );
    res.obj(result || null);
  }

  async putMavenLibraryProjectInSlide(req, res) {
    await this.#service.putMavenLibraryProjectInSlide(
      req.body.button,
      req.body.carousel.slides,
    );
    res.obj(null);
  }

  async postBookToBooksTable(req, res) {
    const { project, method, endpoint, payload } = req.body;
    const result = await this.#service.postBookToBooksTable(
      project,
      method,
      endpoint,
      payload,
    );
    res.obj(result || null);
  }
  async postMemberToMembersTable(req, res) {
    const { project, method, endpoint, payload } = req.body;
    const result = await this.#service.postMemberToMembersTable(
      project,
      method,
      endpoint,
      payload,
    );
    res.obj(result || null);
  }

  async putAuthorInBookById(req, res) {
    const { project, method, endpoint, payload } = req.body;
    const result = await this.#service.putAuthorInBookById(
      project,
      method,
      endpoint,
      payload,
    );
    res.obj(result || null);
  }

  async deleteBook(req, res) {
    const { project, method, endpoint, payload } = req.body;
    const result = await this.#service.deleteBook(
      project,
      method,
      endpoint,
      payload,
    );
    res.obj(result || null);
  }
}
