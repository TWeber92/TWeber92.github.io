import { AuthorsNovelsRoutes } from "../weber-profile-enum/AuthorsNovelsRoutes.js";
import { ProjectView } from "../weber-profile-view/ProjectView.js";
import { ProjectService } from "./ProjectService.js";

export class AuthorsNovelsService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async getAllAuthors(project, method, endpoint) {
    const result = await this.#repo.getAllAuthors(endpoint, method);
    return await super.handleGetRequest({
      result,
      project,
      formatSchema: (result) => {
        const authorsSchema = {
          columns: ["ID", "Name"],
          rows: result.map((a) => ({ id: a.id, name: a.name })),
        };
        const allNovels = result.flatMap((a) => a.novelDTOs);
        const novelsSchema = {
          columns: ["ID", "Title", "Year", "Author ID"],
          rows: allNovels.map((n) => ({
            id: n.id,
            title: n.title,
            year: n.year,
            auth_id: n.authId,
          })),
        };
        return [authorsSchema, novelsSchema];
      },
    });
  }

  async putAuthorsNovelsProjectInSlide(button, slides) {
    const key = button.name;
    const slide = slides[button.dataset.pos];
    const projectCache = this.#repo.entity?.[key];
    console.log(projectCache);
    
    if (projectCache)
      return super.putSelectedProjectInSlide(slide, projectCache);
    const rest = Object.keys(AuthorsNovelsRoutes);
    const schemas = await this.#repo.getAuthorsNovelsTableSchema(button.name);
    const tables = super.putTableTogether(schemas);
    super.putProjectInSlide(button, slide, rest, tables);
  }
}
