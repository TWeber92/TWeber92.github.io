import { HtmlStore } from "../HtmlStore.js";
import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class ProjectRepository extends DocumentClient {
  constructor(view) {
    super();
    this.#entity = view.entity;
  }

  #entity;

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

  putTableTogether({ table, schema, i }) {
    const tableNode =
      i === 0 ? table.firstChild : table.firstChild.cloneNode(true); // deep clone so thead/tbody come along
    const thead = tableNode.firstChild;
    const tbody = tableNode.lastChild;
    const trHeadTmpl = thead.firstChild;
    const thTmpl = trHeadTmpl.firstChild;
    const trBodyTmpl = tbody.firstChild;
    const tdTmpl = trBodyTmpl.firstChild;
    const headerRow = trHeadTmpl.cloneNode(false);
    schema.columns.forEach((col) => {
      const th = thTmpl.cloneNode(false);
      th.textContent = col;
      headerRow.append(th);
    });
    const bodyRows = document.createDocumentFragment();
    schema.rows.forEach((rowData) => {
      const tr = trBodyTmpl.cloneNode(false);
      Object.values(rowData).forEach((val) => {
        const td = tdTmpl.cloneNode(false);
        td.textContent = val;
        tr.append(td);
      });
      bodyRows.append(tr);
    });
    thead.replaceChildren(headerRow);
    tbody.replaceChildren(bodyRows);
    return tableNode;
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
      console.log(s);
      
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
        this.#entity[key] = project;
        slide.replaceChildren(slide.firstChild, project);
      },
    );
  }
  putParmeterInputOnDisplay(formId) {
    super.PUT(
      formId,
      (id) => (this.#entity[id].children[id].parameter.hidden = false),
    );
  }
  putDataInTerminal(context) {
    super.PUT(context, ({ terminal, status, data, message }) => {
      const output = terminal.children.output;
      output.dataset.status = status;
      const statusHeader = `[ HTTP ${status} ]`;
      const messageLine = message ? `${message}\n\n` : "";
      const dataLine = data ? JSON.stringify(data, null, 2) : "";
      output.textContent = `${statusHeader}\n${messageLine}${dataLine}`;
      terminal.open = true;
    });
  }
  putClientBodyOnOffDisplay(form) {
    super.PUT(form.children.textarea, (ta) => (ta.hidden = !ta.hidden));
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
