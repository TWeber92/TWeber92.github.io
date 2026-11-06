import { Application } from "../src/Application.js";
import { AuthorsNovelsRoutes } from "../src/weber-profile-enum/AuthorsNovelsRoutes.js";
import { CabBookingRoutes } from "../src/weber-profile-enum/CabBookingRoutes.js";
import { CoinApiRoutes } from "../src/weber-profile-enum/CoinApiRoutes.js";
import { MavenLibraryRoutes } from "../src/weber-profile-enum/MavenLibraryRoutes.js";
import { SpringSecurityRoutes } from "../src/weber-profile-enum/SpringSecurityRoutes.js";
import { TerminalException } from "../src/weber-profile-exception/WeberProfileError.js";

export const handler = async (e) => {
  let responseBody;
  const form = e.target;
  const project = form.name;
  const { username, password, rest, endpoint, parameter, body } = form;
  const method = rest.value;
  const ep = endpoint.value;
  const authHeader =
    username?.value && password?.value
      ? `Basic ${btoa(`${username.value}:${password.value}`)}`
      : null;
  const {
    authorsNovelsController,
    springSecurityController,
    cabBookingController,
    mavenLibraryController,
    coinApiController,
  } = Application.controllers;
  const res = { obj: (data) => (responseBody = data) };

  const req = {
    body: {
      project,
      authHeader,
      method,
      endpoint: ep,
      parameter: parameter.value,
      body: body.value,
    },
  };

  const router = {
    "spring-security": async () =>
      await SpringSecurityRoutes[method][ep](
        req,
        res,
        springSecurityController,
      ),
    "authors-novels": async () =>
      await AuthorsNovelsRoutes[method][ep](req, res, authorsNovelsController),
    "maven-library": async () =>
      await MavenLibraryRoutes[method][ep](req, res, mavenLibraryController),
    "cab-booking": async () =>
      await CabBookingRoutes[method][ep](req, res, cabBookingController),
    "coin-api": async () =>
      await CoinApiRoutes[method][ep](req, res, coinApiController),
  };

  await router[project]();
  if (responseBody instanceof TerminalException) responseBody.toTerminal();
};
