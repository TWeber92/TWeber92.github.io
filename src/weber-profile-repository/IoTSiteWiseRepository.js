import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class IoTSiteWiseRepository extends DocumentClient {
  constructor(view, render, profile) {
    super();
    this.#entity = view.entity;
    this.#render = render;
  }

  #entity;
  #render

  async getAssetHierarchyById(id){
    const endpoint = `/api/hierarchy/props`
    return await this.#render.GET(endpoint, id)
  }

  getSelectionClone(key) {
    return super.GET(key, (k) => {
      const project = this.#entity[k];
      const form = project.children[k];
      return form.endpoints.cloneNode(true);
    });
  }

  putIdSelectionAfterOptions(context) {
    super.PUT(context, ({ ids, key }) => {
      const project = this.#entity[key];
      const form = project.children[key];
      const options = form.endpoints;
      options.after(ids);
    });
  }

  putChildCoordsInSvg(context) {
    return super.PUT(context, ({ child, i, y }) => {
      const x = i === 0 ? 20 : 220;
      child.children.rect.setAttribute("x", x);
      child.children.rect.setAttribute("y", y);
      return x;
    });
  }

  putLineDataInPath(context) {
    super.PUT(context, ({ x, y, line }) => {
      const d = `M 200 80 L ${x + 80} ${y}`; // Simple line path
      line.setAttribute("d", d);
    });
  }
  putHierarchyInDashboard(dashboard) {
    super.PUT(dashboard, ({ tree, pa, ca }) =>
      tree.children.canvas.append(pa, ca),
    );
  }
}
