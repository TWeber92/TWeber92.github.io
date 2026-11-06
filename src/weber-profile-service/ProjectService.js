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
      // slide,
      options,
      // canvas,
      nodes,
      // terminal: nodes.terminal,
      // project: nodes.projectSlide,
      // client: nodes[key],
    };
  }
  putProjectInSlide(button, slide, rest, canvas) {
    const key = button.name;
    this.#repo.deleteCardFromProjectDisplay(slide);
    const { options, nodes } = this.getEntityProfile(slide, rest, canvas, key);
    console.log(...nodes);
    
    const entity = Project.from({
      options,
      slide,
      canvas,
      terminal: nodes.terminal,
      project: nodes.projectSlide,
      client: nodes[key],
    });
    this.#repo.putProjectAssemblyInSlide({ ...entity.to(), key });
  }

  putEndpointsInSelection(method, routes, project) {
    const { option } = ProjectView.from({});
    const node = this.#repo.getProjectPartsWithHtml(option);
    this.#repo.putEndpointsInSelection({
      method,
      key: project,
      opt: node.option,
      routes: Object.keys(routes),//this would not be the routes with arrrow function val
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
  putClientBodyOnOffDisplay(id) {
    console.log(id);
    
    const project = this.#repo.getProjectFromEntity(id);
    const form = project[id];
    this.#repo.putClientBodyOnOffDisplay(form);
  }
  putSelectedProjectInSlide(slide, project) {
    this.#repo.deleteCardFromProjectDisplay(slide);
    this.#repo.putSelectedProjectInSlide({
      s: slide,
      p: project,
    });
  }
}
