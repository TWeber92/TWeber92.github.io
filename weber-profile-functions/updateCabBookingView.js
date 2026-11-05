import { Application } from "../src/Application.js";
import { TerminalException } from "../src/weber-profile-exception/WeberProfileError.js";
const cabBookingGET = {
  "/api/cab/{bookingType}": async (req, res, controller) =>
    controller.getCabBookings(req, res), // args - project, method, endpoint, parameter
};
const cabBookingPOST = {
  "/api/cab": async (req, res, controller) => controller.postNewCab(req, res),
};
export const handler = async (req) => {
  let responseBody;
  const { cabBookingController } = Application.controllers;
  const res = { obj: (data) => (responseBody = data) };
  const endpoint = req.body.endpoint;
  const method = req.body.method;
  const project = req.body.project;

  const route = `${method}:${project}`;

  const router = {
    "GET:cab-booking": async () => {
      cabBookingGET[endpoint](req, res, cabBookingController);
      if (responseBody instanceof TerminalException) responseBody.toTerminal();
    },
    "POST:cab-booking": async () => {
      cabBookingPOST[endpoint](req, res, cabBookingController);
    },
  };

  await router[route]();
};
