import { Application } from "../src/Application.js";
import { TerminalException } from "../src/weber-profile-exception/WeberProfileError.js";
const springSecurityGET = {
  "/infybank/customers": async (req, res, controller) =>
    await controller.getInfyBankCustomers(req, res), //args - project, method, endpoint
  "/infybank/customer/{id}": async (req, res, controller) =>
    controller.getBankCustomerById(req, res), //args - project, method, endpoint, parameter
};

const springSecurityPOST = {
  "/infybank/customers": async (req, res, controller) =>
    await controller.postCustomerToBank(req, res), //args - project, method, endpoint, body
};

const springSecurityPUT = {
  "/infybank/customer/{id}": async (req, res, controller) =>
    await controller.putDataToCustomerById(req, res), //args - project, method, endpoint, parameter
};

const springSecurityDELETE = {
  "/infybank/customer/{id}": async (req, res, controller) =>
    await controller.deleteBankCustomer(req, res), //args - project, method, endpoint, parameter
};
export const handler = async (req) => {
  let responseBody;
  const { springSecurityController } = Application.controllers;
  const res = { obj: (data) => (responseBody = data) };
  const endpoint = req.body.endpoint;
  const method = req.body.method;
  const project = req.body.project;

  const route = `${method}:${project}`;

  const router = {
    "GET:spring-security": async () => {
      await springSecurityGET[endpoint](req, res, springSecurityController);
      if (responseBody instanceof TerminalException) responseBody.toTerminal();
    },
    "POST:spring-security": async () => {
      await springSecurityPOST[endpoint](req, res, springSecurityController);
    },
    "PUT:spring-security": async () => {
      await springSecurityPUT[endpoint](req, res, springSecurityController);
    },
    "DELETE:spring-security": async () => {
      await springSecurityDELETE[endpoint](req, res, springSecurityController);
    },
  };

  await router[route]();
};
