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
    const schema = [
      await this.#repo.getMavenMembersTableSchema(),
      await this.#repo.getMavenBooksTableSchema(),
    ];
    super.putProjectInSlide(button, slides, rest, schema);
  }
}
