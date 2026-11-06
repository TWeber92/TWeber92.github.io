export const CabBookingRoutes = Object.freeze({
  GET: Object.freeze({
    "/api/cab/{bookingType}": async (req, res, controller) =>
      controller.getCabBookings(req, res), // args - project, method, endpoint, parameter
  }),
  POST: Object.freeze({
    "/api/cab": async (req, res, controller) => controller.postNewCab(req, res),
  }),
});
