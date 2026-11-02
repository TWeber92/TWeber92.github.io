import { Hierarchy } from "../weber-profile-entity/Hierarchy.js";
import { IoTSiteWiseAssets } from "../weber-profile-enum/IoTSiteWiseAssets.js";
import { IoTSiteWiseOptions } from "../weber-profile-enum/IoTSiteWiseOptions.js";
import { IoTSiteWiseView } from "../weber-profile-view/IoTSiteWiseView.js";
import { ProjectView } from "../weber-profile-view/ProjectView.js";
import { ProjectService } from "./ProjectService.js";

export class IoTSiteWiseService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo)
    this.#repo = repo;
  }

  #repo;

  async putIoTSiteWiseProjectInSlide(button, slides) {
    const { dashboard } = ProjectView.from({})
    const node = super.getProjectPartsWithHtml(dashboard)
    const assetNames = Object.keys(IoTSiteWiseOptions);
    const assetIds = IoTSiteWiseAssets;
    super.putProjectInSlide(button, slides, assetNames, node.dashboard);//first dropdown
    super.putEndpointsInSelection(Object.keys(assetIds), key);//3rd dropdown
    const selection = this.#repo.getSelectionClone(key);
    selection.name = "assetIds";
    super.putEndpointsInSelection(IoTSiteWiseOptions["Extrusion Line 1"], key);//second dropdown
    this.#repo.putIdSelectionAfterOptions({ ids: selection, key });//3rd dropown appended after options
    await putSvgCanvasTogether(assetIds["Extrusion Line 1"]);
  }

  async putSvgCanvasTogether(id) {
    const hierarchy = await this.#repo.getAssetHierarchyById(id);
    const entity = Hierarchy.from(hierarchy);
    const { tree, parentAsset, line } = IoTSiteWiseView.from({
      id: entity.parent.lineId,
      name: entity.parent.lineName,
      status: entity.parent.lineStatus,
    });
    const nodes = this.#repo.getProjectPartsWithHtml(tree + parentAsset + line);
    entity.children.forEach((c, i) => {
      const { childAsset, line } = IoTSiteWiseView.from({
        id: c.id,
        name: c.name,
        status: c.status,
      });
      const svg = this.#repo.getProjectPartsWithHtml(childAsset + line); //HTMLCollection
      const y = 120;
      const x = this.#repo.putChildCoordsInSvg({ i, child: svg.childAsset, y });
      this.#repo.putLineDataInPath({ x, y, line: svg.line });
      this.#repo.putDashboardTogether({
        tree: nodes.tree,
        pa: nodes.parentAsset,
        ca: child,
      });
    });
  }
}
