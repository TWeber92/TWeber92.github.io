import { Application } from "../src/Application.js";
import { AuthorsNovelsRoutes } from "../src/weber-profile-enum/AuthorsNovelsRoutes.js";
import { CabBookingRoutes } from "../src/weber-profile-enum/CabBookingRoutes.js";
import { CoinApiRoutes } from "../src/weber-profile-enum/CoinApiRoutes.js";
import { IoTSiteWiseOptions } from "../src/weber-profile-enum/IoTSiteWiseOptions.js";
import { MavenLibraryRoutes } from "../src/weber-profile-enum/MavenLibraryRoutes.js";
import { SpringSecurityRoutes } from "../src/weber-profile-enum/SpringSecurityRoutes.js";

export const handler = async (e) => {
  let responseBody;
  const { projectController, sitewiseController } = Application.controllers;
  const form = e.target.form;
  const { rest, endpoint, assetsIds } = form;
  const project = form?.name;
  console.log(project);
  
  const method = rest.value || null;
  const id = e.target.id;
  console.log(id);
  const endpoints = {
    "spring-security": SpringSecurityRoutes[method],
    "authors-novels": AuthorsNovelsRoutes[method],
    "cab-booking": CabBookingRoutes[method],
    "maven-library": MavenLibraryRoutes[method],
    "iot-sitewise": IoTSiteWiseOptions[method],
    "coin-api": CoinApiRoutes[method],
  };
  const routes = project ? endpoints[project] : undefined;
  const req = {
    body: {
      project,
      routes,
      method,
      endpoint: endpoint.value,
      id: assetsIds?.value,
    },
  };
  const res = { obj: (data) => (responseBody = data) };

  const selectRouter = {
    body: async () => await projectController.putClientBodyOnOffDisplay(req, res), //args - project
    rest: async () => await projectController.putEndpointsInSelection(req, res), //args - method, routes, project
    endpoint: async () =>
      project === "iot-sitewise"
        ? await sitewiseController.putNewMachineDataById(req, res) //args - id, endpoint, method
        : await projectController.putInputControlsInClient(req, res), //args - project, endpoint
    assetIds: async () =>
      await sitewiseController.putNewMachineDataById(req, res), //args - id, endpoint, method
  };

  if (method) selectRouter[id](); //order of operations, set method first
};
