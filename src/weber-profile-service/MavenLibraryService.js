import { MavenLibraryRoutes } from "../weber-profile-enum/MavenLibraryRoutes.js";
import { ProjectService } from "./ProjectService.js";

export class MavenLibraryService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async putMavenLibraryProjectInSlide(button, slides) {
    const rest = Object.keys(MavenLibraryRoutes);
    const schemas = await this.#repo.getMavenLibraryTableSchema();
    const tables = super.putTableTogether(schemas)
    super.putProjectInSlide(button, slides, rest, tables);
  }
}
