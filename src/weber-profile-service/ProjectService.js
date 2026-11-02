import { Project } from "../weber-profile-entity/Project.js";
import { ProjectView } from "../weber-profile-view/ProjectView.js";

export class ProjectService {
  constructor(repo) {
    this.#repo = repo;
  }
  #repo;

  getEntityProfile(slide, rest, canvas, key) {
    const { project, terminal, client, option } = ProjectView.from({
      key,
    });
    const nodes = this.#repo.getProjectPartsWithHtml(
      project + terminal + client + option,
    );
    const options = rest.map((k) =>
      this.#repo.getOption({ opt: nodes.option, val: k }),
    );
    return {
      slide,
      options,
      canvas,
      terminal: nodes.terminal,
      project: nodes.project,
      client: nodes[key],
    };
  }
  putProjectInSlide(button, slides, rest, canvas) {
    const key = button.name;
    const slide = slides[button.dataset.pos];
    this.#repo.deleteCardFromProjectDisplay(slide);
    if (this.#repo.entity?.[key]) return;
    const profile = this.getEntityProfile(slide, rest, canvas, key);
    const entity = Project.from(profile);
    this.#repo.putProjectAssemblyInSlide({ ...entity.to(), key });
  }

  putEndpointsInSelection(routes, formId) {
    const { option } = ProjectView.from({});
    const node = this.#repo.getProjectPartsWithHtml(option);
    this.#repo.putEndpointsInSelection({
      routes,
      key: formId,
      opt: node.option,
    });
  }
  putTableTogether(schemas) {
    const { table } = ProjectView.from({});
    const node = this.#repo.getProjectPartsWithHtml(table);
    return schemas.map((schema, i) =>
      this.#repo.putTableTogether({ table: node.table, schema, i }),
    );
  }
  getProjectPartsWithHtml(html) {//no sense in all the children having the same repo method
    this.#repo.getProjectPartsWithHtml(html)
  }
}
