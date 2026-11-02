export const CoinApiRoutes = Object.freeze({
  GET: Object.freeze([
    "/api/coin",
    "/api/me",
    "/api/logout",
  ]),
  POST: Object.freeze([
    "/api/signup",
    "/api/login",
    "/api/pin",
    "/api/postCoins",
  ]),
  PUT: Object.freeze([
    "/api/user/collection",
    "/api/password",
  ]),
  DELETE: Object.freeze([
    "/api/user",
  ]),
});