import { AuthorsNovelsRoutes } from "../weber-profile-enum/AuthorsNovelsRoutes.js";
import { ProjectView } from "../weber-profile-view/ProjectView.js";
import { ProjectService } from "./ProjectService.js";

export class AuthorsNovelsService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async putAuthorsNovelsProjectInSlide(button, slides) {
    const rest = Object.keys(AuthorsNovelsRoutes);
    const schemas = await this.#repo.getAuthorsNovelsTableSchema();
    const tables = super.putTableTogether(schemas);
    super.putProjectInSlide(button, slides, rest, tables);
  }
}
