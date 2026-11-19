export class IoTSiteWiseController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  async getAssetMetricLatestValue(req, res) {
    const { project, assetId, allowedSuffixes } = req.body;
    const result = await this.#service.getAssetMetricLatestValue(
      project,
      assetId,
      allowedSuffixes,
    );
    res.obj(result || null)
  }

  async putIoTSiteWiseProjectInSlide(req, res) {
    await this.#service.putIoTSiteWiseProjectInSlide(
      req.body.button,
      req.body.carousel.slides,
    );
    res.obj(null);
  }

  async putLineAssetInStaging(req, res) {
    const { element, hierarchy, assetId } = req.body;
    const result = await this.#service.putLineAssetInStaging(
      element,
      assetId,
      hierarchy,
    );
    res.obj(result || null);
  }

  async putActiveAssetInDropdowns(req, res) {
    const result = await this.#service.putActiveAssetInDropdowns(
      req.body.element,
    );
    res.obj(result || null);
  }
}
