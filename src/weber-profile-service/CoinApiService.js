import { CoinApiRoutes } from "../weber-profile-enum/CoinApiRoutes";
import { ProjectView } from "../weber-profile-view/ProjectView";
import { ProjectService } from "./ProjectService";

export class CoinApiService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  putCoinApiProjectInSlide(button, slides) {
    const { card } = ProjectView.from({});
    const node = super.getProjectPartsWithHtml(card);
    const rest = Object.keys(CoinApiRoutes);
    super.putProjectInSlide(button, slides, rest, node.card);
  }
}
