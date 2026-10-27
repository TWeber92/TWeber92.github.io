import { HtmlStore } from "../HtmlStore.js";
import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class ProjectRepository extends DocumentClient {
  constructor(view) {
    super()
    this.#entity = view.entity;
  }

  #entity;

  
  getProjectPartsWithHtml(text) {
    return super.GET(text, (t) => HtmlStore.from(t).nodes);
  }

  putTableTogether({ table, schema }) {
    const thead = table.firstChild;
    const tbody = table.lastChild;
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
  }
  putEndpointsInSelection(context) {
    super.PUT(context, ({ routes, key, opt }) => {
      const project = this.#entity[key];
      const form = project.children[key];
      const selection = form.endpoint;
      selection.replaceChildren(
        ...routes.map((route) => {
          const option = opt.cloneNode(false);
          option.value = route;
          option.textContent = route;
          return option;
        }),
      );
    });
  }
  putProjectAssemblyInSlide(entity) {
    super.PUT(entity, ({ slide, project, tables, client, terminal, key }) => {
      project.append(...tables, client, terminal);
      this.#entity[key] = project;
      slide.append(project);
    });
  }
  deleteCardFromProjectDisplay(slide) {
    super.DELETE(slide, (s) => {
      const card = s.firstChild;
      card.hidden = true;
    });
  }
}
