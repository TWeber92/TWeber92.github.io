import { Project } from "../weber-profile-entity/Project.js";
import { TerminalException } from "../weber-profile-exception/WeberProfileError.js";
import { ProjectView } from "../weber-profile-view/ProjectView.js";

export class ProjectService {
  constructor(repo) {
    this.#repo = repo;
  }
  #repo;

  getProjectPartsWithHtml(html) {
    //no sense in all the children having the same repo method
    this.#repo.getProjectPartsWithHtml(html);
  }

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
      project: nodes.projectSlide,
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

  putEndpointsInSelection(method, routes, project) {
    const { option } = ProjectView.from({});
    const node = this.#repo.getProjectPartsWithHtml(option);
    this.#repo.putEndpointsInSelection({
      routes,
      method,
      key: project,
      opt: node.option,
    });
  }
  putTableTogether(schemas, db = null) {
    const { table } = ProjectView.from({});
    db = db || this.#repo.getProjectPartsWithHtml(table).database;
    db.replaceChildren(
      ...schemas.map((schema, i) =>
        this.#repo.putTableTogether({ table: db, schema, i }),
      ),
    );
    return db;
  }

  putInputControlsInClient(project, endpoint) {
    const hidden = this.#repo.getProjectClient(project).hidden;
    if (hidden && /\{.*?\}/.test(endpoint))
      this.#repo.putParmeterInputOnDisplay(project);
    if (!hidden) this.#repo.deleteParameterInputFromDisplay(project);
  }
  async handleGetRequest({ project, formatSchema, result }) {
    const { terminal, database } = this.#repo.getProjectFromEntity(project);
    if (result.message)
      return new TerminalException(
        result.message,
        result.data,
        terminal,
        result.status,
      );
    const schema = formatSchema(result);
    this.putTableTogether(schema, database);
    this.#repo.putDataInTerminal({
      terminal,
      status: 200,
      data: result,
      message: "Success",
    });
  }
  putClientBodyOnDisplay(id) {
    const project = this.#repo.getProjectFromEntity(id);
    const form = project[id];
    this.#repo.putClientBodyOnDisplay(form);
  }
}
