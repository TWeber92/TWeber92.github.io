import { SpringSecurityRoutes } from "../weber-profile-enum/SpringSecurityRoutes.js";
import { ProjectService } from "./ProjectService.js";

export class SpringSecurityService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async putSpringSecurityProjectInSlide(button, slides) {
    const key = button.name;
    const rest = Object.keys(SpringSecurityRoutes);
    const schema = [await this.#repo.getSecurityTableSchema()];
    super.putProjectInSlide(button, slides, rest, schema);
    this.#repo.putAuthGroupInClientDisplay(key);
  }
}
