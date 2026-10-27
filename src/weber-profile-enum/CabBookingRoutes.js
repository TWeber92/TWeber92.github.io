export const CabBookingRoutes = Object.freeze({
  GET: Object.freeze([
    "/api/cabs",
    "/api/cabs/{id}",
    "/api/bookings",
    "/api/bookings/{id}",
  ]),
  POST: Object.freeze(["/api/cabs", "/api/bookings"]),
  PUT: Object.freeze(["/api/cabs/{id}", "/api/bookings/{id}"]),
  DELETE: Object.freeze(["/api/cabs/{id}", "/api/bookings/{id}"]),
});
