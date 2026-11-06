import { MavenLibraryRoutes } from "../weber-profile-enum/MavenLibraryRoutes.js";
import { ProjectService } from "./ProjectService.js";

export class MavenLibraryService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async getLibraryBooks(project, method, endpoint) {
    const result = await this.#repo.getLibraryBooks(endpoint, method);
    console.log("Is Array?", Array.isArray(result));
    console.log("Typeof:", typeof result);
    console.log("Raw:", result);

    return await super.handleGetRequest({
      result,
      project,
      formatSchema: (result) => [
        {
          columns: ["ID", "Title", "Author", "ISBN"],
          rows: result.map((book) => ({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            memberId: book.memberId,
          })),
        },
      ],
    });
  }

  async putMavenLibraryProjectInSlide(button, slides) {
    const key = button.name;
    const slide = slides[button.dataset.pos];
    const projectCache = this.#repo.entity?.[key];
    if (projectCache)
      return super.putSelectedProjectInSlide(slide, projectCache);
    const rest = Object.keys(MavenLibraryRoutes);
    const schemas = await this.#repo.getMavenLibraryTableSchema(button.name);
    const tables = super.putTableTogether(schemas);
    super.putProjectInSlide(button, slide, rest, tables);
  }
}
