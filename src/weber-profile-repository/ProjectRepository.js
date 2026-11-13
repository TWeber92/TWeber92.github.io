import { HtmlStore } from "../HtmlStore.js";
import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class ProjectRepository extends DocumentClient {
  constructor(view, profile) {
    super();
    this.#entity = view.entity;
    this.#profile = profile
  }

  #entity;
  #profile;

  
  async putProject(project) {
    return await this.#profile.PUT(
      `/api/v1/project`,
      "PUT",
      {},
      { projectName: project },
    );
  }

  getProjectPartsWithHtml(text) {
    return super.GET(text, (t) => HtmlStore.from(t).nodes);
  }
  getOption(context) {
    return super.GET(context, ({ opt, val }) => {
      const option = opt.cloneNode(false);
      option.value = val;
      option.textContent = val;
      return option;
    });
  }
  getProjectClient(formId) {
    return super.GET(formId, (id) => this.#entity[id].children[id].parameter);
  }
  getProjectFromEntity(project) {
    return super.GET(project, (id) => this.#entity[id].children);
  }
  getRowByColumnValue(context) {
    return super.GET(context, ({ table, cn, val }) => {
      const tbody = table.children.tbody;
      return [...tbody.children].find(
        (r) => r.children[cn].textContent === val.toString(),
      );
    });
  }
  getCellValueById(context) {
    return super.GET(context, ({ row, id }) => row.children[id].textContent);
  }
  getRowByCellValue(context) {
    super.PUT(context, ({ table, cn, val }) => {
      const tbody = table.children.tbody;
      [...tbody.children].forEach(
        (r) => (r.hidden = r.children[cn].textContent !== val.toString()),
      );
    });
  }
  putNewValuesInRow(context) {
    super.PUT(context, ({ row, keys, result }) =>
      keys.forEach((k) => (row.children[k].textContent = result[k])),
    );
  }
  putEndpointsInSelection(context) {
    super.PUT(context, ({ method, routes, key, opt }) => {
      const project = this.#entity[key];
      const form = project.children[key];
      form.button.textContent = method;
      const selection = form.endpoint;
      const disabled = selection.firstChild;
      selection.replaceChildren(
        disabled,
        ...routes.map((route) => this.getOption({ opt, val: route })),
      );
    });
  }
  putSelectedProjectInSlide(entity) {
    super.PUT(entity, ({ s, p }) => {
      p.hidden = false;
      s.replaceChild(p, s.lastChild);
    });
  }
  putProjectAssemblyInSlide(entity) {
    super.PUT(
      entity,
      ({ slide, project, canvas, client, options, terminal, key }) => {
        project.hidden = false;
        client.rest.append(...options);
        project.append(canvas, client, terminal);
        slide.replaceChildren(slide.firstChild, project);
        this.#entity[key] = project;
      },
    );
  }
  putParmeterInputOnDisplay(formId) {
    return super.PUT(formId, (id) => {
      const project = this.#entity[id];
      const form = project.children[id];
      const queryParam = form.parameter;
      queryParam.hidden = false;
      return queryParam;
    });
  }
  putDataInTerminal(context) {
    super.PUT(context, ({ terminal, status, data, message }) => {
      const output = terminal.children.output;
      output.dataset.status = status;
      const statusHeader = `[ HTTP ${status} ]`;
      const messageLine = message ? `${message}\n\n` : "";
      const dataLine = data ? JSON.stringify(data, null, 2) : "";
      output.firstChild.textContent = `${statusHeader}\n${messageLine}${dataLine}`;
      terminal.open = true;
    });
  }
  putClientBodyOnOffDisplay(form) {
    super.PUT(form.children.textarea, (ta) => (ta.hidden = !ta.hidden));
  }
  putRowIntoTable(context) {
    super.PUT(context, ({ table, row }) => {
      const tbody = table.children.tbody;
      const tr = tbody.firstChild.cloneNode(true);
      Object.values(row).forEach((val, i) => {
        tr.cells[i].textContent = val;
      });
      tbody.append(tr);
    });
  }
  putNewTablesInDataBase(context) {
    return super.PUT(context, ({ db, schemas }) =>
      db.replaceChildren(
        ...schemas.map((schema, i) =>
          this.#putTableTogether({ table: db.firstChild, schema, i }),
        ),
      ),
    );
  }
  #putTableTogether({ table, schema, i }) {
    const labelize = (c) =>
      c.replace(/_/g, " ").replace(/\b\w/g, (n) => n.toUpperCase());
    const normalize = (s) =>
      s.toLowerCase().replace(/_(\w)/g, (_, c) => c.toUpperCase());
    const tableWrapper = i === 0 ? table : table.cloneNode(true); // deep clone so thead/tbody come along
    const tableNode = tableWrapper.firstChild;
    if (schema.name) tableWrapper.id = schema.name;
    const { thead, tbody } = tableNode.children;
    const trHeadTmpl = thead.firstChild;
    const thTmpl = trHeadTmpl.firstChild;
    const trBodyTmpl = tbody.firstChild;
    const tdTmpl = trBodyTmpl.firstChild;
    const headerRow = trHeadTmpl.cloneNode(false);
    schema.columns.forEach((col) => {
      const th = thTmpl.cloneNode(false);
      th.textContent = labelize(col);
      th.id = normalize(col);
      headerRow.append(th);
    });
    const bodyRows = document.createDocumentFragment();
    schema.rows.forEach((rowData) => {
      const tr = trBodyTmpl.cloneNode(false);
      Object.entries(rowData).forEach(([_, val], i) => {
        const td = tdTmpl.cloneNode(false);
        td.id = normalize(schema.columns[i]);
        td.textContent = val;
        tr.append(td);
      });
      bodyRows.append(tr);
    });
    thead.replaceChildren(headerRow);
    tbody.replaceChildren(bodyRows);
    return tableWrapper;
  }
  deleteParameterInputFromDisplay(formId) {
    super.PUT(
      formId,
      (id) => (this.#entity[id].children[id].parameter.hidden = true),
    );
  }
  deleteCardFromProjectDisplay(slide) {
    super.DELETE(slide, (s) => {
      const card = s.firstChild;
      card.hidden = true;
    });
  }
}
