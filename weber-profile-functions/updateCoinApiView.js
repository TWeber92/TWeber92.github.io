import { Application } from "../src/Application.js";
const coinApiGET = {
  "/api/coin": async (req, res, controller) =>
    controller.getCoinByStateName(req, res), // Expects { stateName } in req.body or query
  "/api/me": async (req, res, controller) =>
    controller.getCurrentUser(req, res), // Handles session cookie natively
  "/api/logout": async (req, res, controller) =>
    controller.logoutUser(req, res), // Clears session cookie
};

const coinApiPOST = {
  "/api/signup": async (req, res, controller) =>
    controller.createUser(req, res), // Expects { email, password }
  "/api/login": async (req, res, controller) => controller.loginUser(req, res), // Expects { email, password }
  "/api/pin": async (req, res, controller) =>
    controller.requestPasswordResetPin(req, res), // Expects { email }
  "/api/postCoins": async (req, res, controller) =>
    controller.postAllStateCoins(req, res), // Requires Basic Auth headers
};

const coinApiPUT = {
  "/api/user/collection": async (req, res, controller) =>
    controller.updateUserCollection(req, res), // Expects { collection }
  "/api/password": async (req, res, controller) =>
    controller.resetUserPassword(req, res), // Expects { email, pin, newPassword }
};

const coinApiDELETE = {
  "/api/user": async (req, res, controller) => controller.deleteUser(req, res), // Expects { uuid } or session cookie
};
export const handler = async (req) => {
  let responseBody;
  const { coinApiController } = Application.controllers;
  const res = { obj: (data) => (responseBody = data) };
  const endpoint = req.body.endpoint;
  const method = req.body.method;
  const project = req.body.project;

  const route = `${method}:${project}`;

  const router = {
    "GET:coin-api": async () => {
      coinApiGET[endpoint](req, res, coinApiController);
      if (responseBody instanceof TerminalException) responseBody.toTerminal();
    },
    "POST:coin-api": async () => {
      coinApiPOST[endpoint](req, res, coinApiController);
    },
    "PUT:coin-api": async () => {
      coinApiPUT[endpoint](req, res, coinApiController);
    },
    "DELETE:coin-api": async () => {
      coinApiDELETE[endpoint](req, res, coinApiController);
    },
  };

  await router[route]();
};
