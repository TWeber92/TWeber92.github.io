import { CoinApiRoutes } from "../weber-profile-enum/CoinApiRoutes.js";
import { ProjectView } from "../weber-profile-view/ProjectView.js";
import { ProjectService } from "./ProjectService.js";

export class CoinApiService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  putCoinApiProjectInSlide(button, slides) {
    console.log("here");
    const key = button.name;
    const slide = slides[button.dataset.pos];
    const projectCache = this.#repo.entity?.[key];
    if (projectCache)
      return super.putSelectedProjectInSlide(slide, projectCache);
    const { card } = ProjectView.from({});
    const node = super.getProjectPartsWithHtml(card);
    const rest = Object.keys(CoinApiRoutes);
    super.putProjectInSlide(button, slide, rest, node.card);
  }
}
