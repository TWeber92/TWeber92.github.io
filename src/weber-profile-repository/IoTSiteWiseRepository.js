import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class IoTSiteWiseRepository extends DocumentClient {
  constructor(view, render) {
    super();
    this.#entity = view.entity;
    this.#render = render;
  }

  #entity;
  #render;

  get entity() {
    return this.#entity;
  }

  async getAssetHierarchyById(endpoint, payload) {
    return await this.#render.GET(endpoint, "POST", {}, payload);
  }
  async getAssetMetricLatestValue(payload) {
    const endpoint = "/api/asset/metric/lat-val";
    console.log(endpoint, payload);
    return await this.#render.GET(endpoint, "POST", {}, payload);
  }
  async getChildAssets(endpoint, method) {
    return await this.#render.GET(endpoint, method);
  }
  async getAssetHierarchy(endpoint, method) {
    return await this.#render.GET(endpoint, method);
  }
  async getAssetPropertyHistory(endpoint, method) {
    return await this.#render.GET(endpoint, method);
  }
  async getPropertyAggregates(endpoint, method) {
    return await this.#render.GET(endpoint, method);
  }

  getAssetIdSelection(key) {
    return super.GET(key, (k) => {
      const project = this.#entity[k];
      const form = project.children[k];
      const { endpoint } = form;
      return endpoint.cloneNode(true);
    });
  }

  putIdSelectionAfterActions(context) {
    super.PUT(context, ({ ids, key }) => {
      const project = this.#entity[key];
      const form = project.children[key];
      const { body, button, rest, endpoint } = form;
      body[0].hidden = true;
      button.hidden = true;
      rest.firstChild.textContent = "Assets";
      rest.name = "assetNames";
      ids.firstChild.textContent = "Asset IDs";
      ids.name = "assetIds";
      ids.firstChild.selected = true;
      endpoint.after(ids);
    });
  }

  putIdsInAssetIds(context) {
    super.PUT(context, ({ ids, key }) => {
      const project = this.#entity[key];
      const form = project.children[key];
      const { endpoint } = form;
      endpoint.id = "actions";
      endpoint.name = "actions";
      const action = endpoint.firstChild.cloneNode(false);
      action.textContent = "Actions";
      ids.replaceChildren(...endpoint.children);
      endpoint.replaceChildren(action);
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

  putLinesInStaging(context) {
    super.PUT(context, ({ key, staging, lines, names, ids }) => {
      const project = this.#entity[key];
      const dashboard = project.children.dashboard;
      const equipment = names.map((n, i) => {
        const line =
          i === 0 ? lines.firstChild : lines.firstChild.cloneNode(true);
        line.name = n;
        line.dataset.id = ids[i];
        line.textContent = n;
        return line;
      });
      staging.replaceChildren(...equipment);
      dashboard.append(staging);
    });
  }
  putEquipmentInStaging(context) {
    super.PUT(context, ({ key, nodes, children }) => {
      const { back, assets, parent, child } = nodes;
      const project = this.#entity[key];
      const dashboard = project.children.dashboard;
      const staging = dashboard.firstChild;
      staging.replaceChildren(back, assets);
      const machines = children.flatMap((c) => {
        const clone = child.cloneNode(true);
        const span = clone.lastChild;
        const equipment = clone.children.equipment;
        equipment.value = c.name;
        equipment.dataset.id = c.id;
        span.textContent = c.name;
        return [clone];
      });
      assets.append(parent, ...machines);
    });
  }
  putOptionsInDropDown(context) {
    super.PUT(context, ({ dropdown, options }) => {
      const placeholder = dropdown.firstChild;
      dropdown.replaceChildren(placeholder, ...options);
    });
  }
  putSelectedAssetInDropdown(context) {
    super.PUT(context, ({ dropdown, val }) =>
      [...dropdown.options].forEach((o) => {
        if (o.value === val) o.selected = true;
      }),
    );
  }
  putRadioInSelectedFocus(context) {
    return super.PUT(context, ({ project, key, val }) => {
      const dashboard = project.dashboard;
      const staging = dashboard.children.staging;
      const form = staging.children[key];
      const equipment = form.equipment;
      const asset = [...equipment].find(
        (a) => a.value === val || a.dataset.id === val,
      );
      asset.checked = true;
      return asset;
    });
  }
  putTilesInStaging(context) {
    super.PUT(context, ({ dashboard, tiles, data, thresholds }) => {
      const staging = dashboard.children.staging;
      tiles = staging.children.tiles || tiles
      const tile = tiles.firstChild;
      const fragment = document.createDocumentFragment();
      Object.entries(data).forEach(([name, value]) => {
        const clone = tile.cloneNode(true);
        const { tileName, tileValue } = clone.children;
        tileName.textContent = name;
        tileValue.textContent = ` ${value}`;
        clone.dataset.status = this.#evaluateStatus(name, value, thresholds);
        fragment.append(clone);
      });
      tiles.replaceChildren(fragment);
      staging.append(tiles);
    });
  }
  #evaluateStatus(name, value, thresholds) {
    const key = Object.keys(thresholds).find((k) => name.endsWith(k));
    if (!key) return "ok";
    const { warn, crit, direction } = thresholds[key];
    if (direction === "above") {
      if (value >= crit) return "critical";
      if (value >= warn) return "warning";
    } else {
      if (value <= crit) return "critical";
      if (value <= warn) return "warning";
    }
    return "ok";
  }
}
