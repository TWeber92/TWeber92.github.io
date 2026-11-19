export const IoTSiteWiseActions = Object.freeze({
  Overview: async (req, res, controller) =>
    controller.getAssetMetricLatestValue(req, res),
  "Hierarchy Tree": async (req, res, controller) =>
    controller.getHierarchyProperties(req, res),
  "Property History": async (req, res, controller) =>
    controller.getAssetPropertyHistoricalValues(req, res),
  Aggregates: async (req, res, controller) =>
    controller.getPropertyAggregates(req, res),
});

export const IoTSiteWiseThresholds = Object.freeze({
  Temperature: { warn: 220, crit: 240, direction: "above" },
  Torque: { warn: 15, crit: 18, direction: "above" },
  Resistance: { warn: 400, crit: 300, direction: "below" },
  Downtime: { warn: 30, crit: 60, direction: "above" },
});
