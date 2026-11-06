export const CoinApiRoutes = Object.freeze({
  GET: Object.freeze({
    "/api/coin": async (req, res, controller) =>
      controller.getCoinByStateName(req, res), // Expects { stateName } in req.body or query
    "/api/me": async (req, res, controller) =>
      controller.getCurrentUser(req, res), // Handles session cookie natively
    "/api/logout": async (req, res, controller) =>
      controller.logoutUser(req, res), // Clears session cookie
  }),
  POST: Object.freeze({
    "/api/signup": async (req, res, controller) =>
      controller.createUser(req, res), // Expects { email, password }
    "/api/login": async (req, res, controller) =>
      controller.loginUser(req, res), // Expects { email, password }
    "/api/pin": async (req, res, controller) =>
      controller.requestPasswordResetPin(req, res), // Expects { email }
    "/api/postCoins": async (req, res, controller) =>
      controller.postAllStateCoins(req, res), // Requires Basic Auth headers
  }),
  PUT: Object.freeze({
    "/api/user/collection": async (req, res, controller) =>
      controller.updateUserCollection(req, res), // Expects { collection }
    "/api/password": async (req, res, controller) =>
      controller.resetUserPassword(req, res), // Expects { email, pin, newPassword }
  }),
  DELETE: Object.freeze({
    "/api/user": async (req, res, controller) =>
      controller.deleteUser(req, res), // Expects { uuid } or session cookie
  }),
});
