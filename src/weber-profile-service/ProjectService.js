import { Project } from "../weber-profile-entity/Project.js";
import { ProjectView } from "../weber-profile-view/ProjectView.js";

export class ProjectService {
  constructor(repo) {
    this.#repo = repo;
  }
  #repo;

  getEntityProfile(slide, rest, schemas, key) {
    const { project, terminal, table, client } = ProjectView.from({
      ...Object.fromEntries(rest.map((k) => [k, k])),
      key,
    });
    const nodes = this.#repo.getProjectPartsWithHtml(
      project + terminal + table + client,
    );
    const tables = schemas.map((schema, i) => {
      const tableNode = i === 0 ? nodes.table : nodes.table.cloneNode(true); // deep clone so thead/tbody come along
      this.#repo.putTableTogether({ table: tableNode, schema });
      return tableNode;
    });
    return {
      slide,
      tables,
      terminal: nodes.terminal,
      project: nodes.project,
      client: nodes[key],
    };
  }
  putProjectInSlide(button, slides, rest, schema) {
    const key = button.name;
    const slide = slides[button.dataset.pos];
    this.#repo.deleteCardFromProjectDisplay(slide);
    if (this.#repo.entity?.[key]) return;
    const profile = this.getEntityProfile(slide, rest, schema, key);
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
}
