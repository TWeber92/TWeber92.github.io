import { AuthorsNovelsRoutes } from "../weber-profile-enum/AuthorsNovelsRoutes.js";
import { ProjectService } from "./ProjectService.js";

export class AuthorsNovelsService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async putAuthorsNovelsProjectInSlide(button, slides) {
    const rest = Object.keys(AuthorsNovelsRoutes);
    const schema = [
      await this.#repo.getAuthorsNovelsAuthorsTableSchema(),
      await this.#repo.getAuthorsNovelsNovelsTableSchema(),
    ];
    super.putProjectInSlide(button, slides, rest, schema);
  }
}
