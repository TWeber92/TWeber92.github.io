import { Application } from "../src/Application.js";
import { IoTSiteWiseActions } from "../src/weber-profile-enum/IoTSiteWiseActions.js";
import {
  IoTSiteWiseChildren,
  IoTSiteWiseLines,
} from "../src/weber-profile-enum/IoTSiteWiseAssets.js";
import { IoTSiteWiseHierarchy } from "../src/weber-profile-enum/IoTSiteWiseHierarchy.js";

export const handler = async (e) => {
  let responseBody;
  let machine;
  const { iotSiteWiseController } = Application.controllers;
  const form = e.target.form;
  const id = e.target.id;
  console.log(id);

  const { assetNames, actions, assetIds } = form ?? {};
  console.log(id);
  const lines = IoTSiteWiseLines;
  const machines = IoTSiteWiseChildren;
  const equipment = { ...lines, ...machines };
  const assetId =
    e.target.dataset?.id ||
    assetIds.value ||
    Object.keys(equipment).find((key) => equipment[key] === assetNames.value);
  console.log(id);
  if (assetIds?.value) machine = !!machines[assetIds.value];
  if (assetNames?.value)
    machine = Object.keys(machines).includes(assetNames.value);

  console.log(id);
  const req = {
    body: {
      assetId,
      element: e.target,
      project: form?.name,
      hierarchy: IoTSiteWiseHierarchy,
      allowedSuffixes:
        "speed,machineDowntime,Temperature,Torque,Resistance,lineName,lineStatus",
    },
  };
  console.log(id);
  const res = { obj: (data) => (responseBody = data) };
  const route = machine ? "putActiveAssetInDropdowns" : "putLineAssetInStaging";
  const selectRouter = {
    line: async () =>
      await iotSiteWiseController.putLineAssetInStaging(req, res),
    machine: async () =>
      await iotSiteWiseController.putActiveAssetInDropdowns(req, res),
    rest: async () => await iotSiteWiseController[route](req, res),
    endpoint: async () => await iotSiteWiseController[route](req, res),
    actions: async () =>
      await IoTSiteWiseActions[actions.value](req, res, iotSiteWiseController),
  };
  await selectRouter[id]();
  if (responseBody instanceof TerminalException) responseBody.toTerminal();
};
