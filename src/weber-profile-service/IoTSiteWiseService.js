import { SiteWiseDTO } from "../weber-profile-dto/SiteWiseDTO.js";
import {
  IoTSiteWiseActions,
  IoTSiteWiseThresholds,
} from "../weber-profile-enum/IoTSiteWiseActions.js";
import { IoTSiteWiseLines } from "../weber-profile-enum/IoTSiteWiseAssets.js";
import { IoTSiteWiseView } from "../weber-profile-view/IoTSiteWiseView.js";
import { ProjectView } from "../weber-profile-view/ProjectView.js";
import { ProjectService } from "./ProjectService.js";

export class IoTSiteWiseService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async putIoTSiteWiseProjectInSlide(button, slides) {
    const { dashboard } = ProjectView.from({});
    const key = button.name;
    const slide = slides[button.dataset.pos];
    const projectCache = this.#repo.entity?.[key];
    if (projectCache)
      return super.putSelectedProjectInSlide(slide, projectCache);
    const node = super.getProjectPartsWithHtml(dashboard);
    const lines = IoTSiteWiseLines;
    const assetNames = Object.values(lines);
    super.putProjectInSlide(button, slide, assetNames, node.dashboard); //first dropdown
    const assetIds = this.#repo.getAssetIdSelection(key); //endpoint clone - unmodified still
    super.putEndpointsInSelection("", lines, key); //this adds the ids to endpoints dropdown
    // we move it in this method - endpoint dropdown options move to new assetIds dropdown
    this.#repo.putIdsInAssetIds({ ids: assetIds, key });
    this.#repo.putIdSelectionAfterActions({ ids: assetIds, key });
    this.putDashboardTogether(assetNames, Object.keys(lines), key);
  }

  putDashboardTogether(assetNames, assetIds, key) {
    const { staging, lines } = IoTSiteWiseView.from({});
    const nodes = super.getProjectPartsWithHtml(staging + lines);
    this.#repo.putLinesInStaging({
      key,
      staging: nodes.staging,
      lines: nodes.lines,
      names: assetNames,
      ids: assetIds,
    });
  }

  async putLineAssetInStaging(element, id, hierarchy) {
    //hierachy is IotSiteWiseHierarchy enum
    if (!(element instanceof HTMLButtonElement))
      this.putActiveAssetInDropdowns(element);
    const key = element.parentNode.dataset.project;
    const payload = { parentAssetId: id, hierarchy: hierarchy.CHILD1 };
    const result = JSON.parse(
      await this.#repo.getAssetHierarchyById(hierarchy.ENDPOINT, payload),
    );
    const response = super.handleTerminal(key, result);
    if (response.success) {
      const { parent, children } = SiteWiseDTO.from(result).to();
      const props = Object.fromEntries(
        parent.properties.map((p) => [p.propertyName, p.latestValue]),
      );
      const { back, assets, line, machine } = IoTSiteWiseView.from({
        id: parent.id,
        name: parent.name,
        status: props.lineStatus,
      });
      const nodes = super.getProjectPartsWithHtml(
        back + assets + line + machine,
      );
      this.#repo.putEquipmentInStaging({ key, nodes, children });
      const { names, ids } = children.reduce(
        (acc, child) => {
          acc.names.push(super.getOption(child.name));
          acc.ids.push(super.getOption(child.id));
          return acc;
        },
        { names: [], ids: [] },
      );
      ids.unshift(super.getOption(parent.id));
      names.unshift(super.getOption(parent.name));
      const project = super.getProjectFromEntity(key);
      const form = project[key];
      this.#repo.putOptionsInDropDown({
        dropdown: form.assetNames,
        options: names,
      });
      this.#repo.putOptionsInDropDown({
        dropdown: form.assetIds,
        options: ids,
      });
    } else return response;
  }

  putActiveAssetInDropdowns(element) {
    let asset = null;
    const key = element.form.name;
    const select = element instanceof HTMLSelectElement;
    const actions = Object.keys(IoTSiteWiseActions);
    const project = super.getProjectFromEntity(key);
    const form = project[key];
    if (select)
      asset = this.#repo.putRadioInSelectedFocus({
        project,
        key,
        val: element.value,
      });
    const options = actions.map((o) => super.getOption(o));
    this.#repo.putOptionsInDropDown({ dropdown: form.actions, options });
    form.actions.options[0].selected = true;
    this.#repo.putSelectedAssetInDropdown({
      dropdown: form.assetNames,
      val: select ? asset.value : element.value,
    });
    this.#repo.putSelectedAssetInDropdown({
      dropdown: form.assetIds,
      val: select ? asset.dataset.id : element.dataset.id,
    });
  }
  async getAssetMetricLatestValue(project, assetId, allowedSuffixes) {
    const payload = { assetId, allowed_suffixes: allowedSuffixes };
    const result = JSON.parse(
      await this.#repo.getAssetMetricLatestValue(payload),
    );
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { tiles } = IoTSiteWiseView.from({});
      const nodes = super.getProjectPartsWithHtml(tiles);
      const { dashboard } = super.getProjectFromEntity(project);
      this.#repo.putTilesInStaging({
        dashboard,
        tiles: nodes.tiles,
        data: result,
        thresholds: IoTSiteWiseThresholds,
      });
    } else return response;
  }
}
