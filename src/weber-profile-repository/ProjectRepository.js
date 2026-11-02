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

  putTableTogether({ table, schema, i }) {
    const tableNode = i === 0 ? table : table.cloneNode(true); // deep clone so thead/tbody come along
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
    super.PUT(context, ({ routes, key, opt }) => {
      const project = this.#entity[key];
      const form = project.children[key];
      const selection = form.endpoint;
      selection.replaceChildren(
        ...routes.map((route) => this.getOption({ opt, val: route })),
      );
    });
  }

  putProjectAssemblyInSlide(entity) {
    super.PUT(
      entity,
      ({ slide, project, canvas, client, options, terminal, key }) => {
        client.rest.append(...options);
        project.append(...canvas, client, terminal);
        this.#entity[key] = project;
        slide.append(project);
      },
    );
  }
  deleteCardFromProjectDisplay(slide) {
    super.DELETE(slide, (s) => {
      const card = s.firstChild;
      card.hidden = true;
    });
  }
}
