import { Application } from "../src/Application.js";
import { AuthorsNovelsRoutes } from "../src/weber-profile-enum/AuthorsNovelsRoutes.js";
import { CabBookingRoutes } from "../src/weber-profile-enum/CabBookingRoutes.js";
import { CoinApiRoutes } from "../src/weber-profile-enum/CoinApiRoutes.js";
import { IoTSiteWiseOptions } from "../src/weber-profile-enum/IoTSiteWiseOptions.js";
import { MavenLibraryRoutes } from "../src/weber-profile-enum/MavenLibraryRoutes.js";
import { SpringSecurityRoutes } from "../src/weber-profile-enum/SpringSecurityRoutes.js";

export const handler = async (e) => {
  let responseBody;
  const {
    projectController,
    springSecurityController,
    authorsNovelsController,
    cabBookingController,
    mavenLibraryController,
    coinApiController,
    sitewiseController,
    carouselController,
  } = Application.controllers;
  const formId = e.target.form?.id;
  const value = e.target.value;
  const endpoints = {
    "spring-security": SpringSecurityRoutes[value],
    "authors-novels": AuthorsNovelsRoutes[value],
    "cab-booking": CabBookingRoutes[value],
    "maven-library": MavenLibraryRoutes[value],
    "iot-sitewise": IoTSiteWiseOptions[value],
    "coin-api": CoinApiRoutes[value],
  };
  const routes = formId ? endpoints[formId] : undefined;
  const req = { body: { formId, routes } };
  const res = { obj: (data) => (responseBody = data) };

  
  const router = {
    rest: async () => await projectController.putEndpointsInSelection(req, res), //args - routes, formId
    
  };

  router[e.target.name]();
};
