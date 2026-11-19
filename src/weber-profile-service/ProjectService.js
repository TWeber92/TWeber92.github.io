import { Project } from "../weber-profile-entity/Project.js";
import { TerminalException } from "../weber-profile-exception/WeberProfileError.js";
import { ProjectFormValidator } from "../weber-profile-validation/ProjectFormValidator.js";
import { ProjectView } from "../weber-profile-view/ProjectView.js";

export class ProjectService {
  constructor(repo) {
    this.#repo = repo;
  }
  #repo;

  async putProject(project) {
    this.#repo.putProject(project);
  }

  getProjectPartsWithHtml(html) {
    return this.#repo.getProjectPartsWithHtml(html);
  }
  getProjectFromEntity(project) {
    return this.#repo.getProjectFromEntity(project);
  }
  getRowById(table, id) {
    return this.#repo.getRowById({ table, id });
  }
  getRowByColumnValue(table, columnName, val) {
    return this.#repo.getRowByColumnValue({ table, cn: columnName, val });
  }
  getCellValueById(row, columnName) {
    return this.#repo.getCellValueById({ row, id: columnName });
  }
  getRowByCellValue(table, columnName, val) {
    this.#repo.getRowByCellValue({ table, cn: columnName, val });
  }

  getOption(val) {
    const { option } = ProjectView.from({});
    const nodes = this.#repo.getProjectPartsWithHtml(option);
    return this.#repo.getOption({ opt: nodes.option, val });
  }

  getEntityProfile(rest, key) {
    const { project, terminal, client } = ProjectView.from({
      key,
    });
    const nodes = this.#repo.getProjectPartsWithHtml(
      project + terminal + client,
    );
    const options = rest.map((k) => this.getOption(k));
    return {
      options,
      nodes,
    };
  }
  putNewValuesInRow(row, keys, result) {
    this.#repo.putNewValuesInRow({ row, keys, result });
  }
  putProjectInSlide(button, slide, rest, canvas) {
    const key = button.name;
    this.#repo.deleteCardFromProjectDisplay(slide);
    const { options, nodes } = this.getEntityProfile(rest, key);
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
      routes: Object.keys(routes), //this would not be the routes with arrrow function val
    });
  }
  putTableTogether(schemas, db = null) {
    const { table } = ProjectView.from({});
    db = db || this.#repo.getProjectPartsWithHtml(table).database;
    this.#repo.putNewTablesInDataBase({ db, schemas });
    return db;
  }

  putInputControlsInClient(project, endpoint) {
    const hidden = this.#repo.getProjectClient(project).hidden;
    if (hidden && /\{.*?\}/.test(endpoint)) {
      const queryParam = this.#repo.putParmeterInputOnDisplay(project);
      const placeholder = endpoint.slice(endpoint.indexOf("{"));
      queryParam.placeholder = placeholder.replace(/[{}]/g, "");
    }
    if (!hidden) this.#repo.deleteParameterInputFromDisplay(project);
  }
  putClientBodyOnOffDisplay(id) {
    const project = this.getProjectFromEntity(id);
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
  putRowIntoTable(table, row) {
    this.#repo.putRowIntoTable({ table, row });
  }
  deleteRowFromTable(table, id) {
    const tbody = table.children.tbody;
    const rowToDelete = [...tbody.children].find(
      (row) => row.cells[0].textContent === id.toString(),
    );
    if (rowToDelete) rowToDelete.remove();
  }
  handleTerminal(project, result) {
    const { terminal } = this.getProjectFromEntity(project);
    if (result.info || result.error)
      return new TerminalException(
        result.info || result.error,
        result.data,
        terminal,
        result.status,
      );
    else
      this.#repo.putDataInTerminal({
        terminal,
        status: 200,
        data: result,
        message: "Success",
      });
    return { success: true };
  }
  handleTextAreaFormat(project, text) {
    const { terminal } = this.getProjectFromEntity(project);
    const valid = ProjectFormValidator.validateFormPayload(text, terminal);
    if (!valid.success) return valid;
    const parseable = text.replace(/(\w+)(?=\s*:)/g, '"$1"');
    return parseable;
  }
}
