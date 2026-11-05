import {
  updateSpringSecView,
  updateAuthorsNovView,
  updateCabBookingView,
  updateMavenLibView,
  updateCoinApiView,
} from "./index.js";
export const handler = async (e) => {
  const form = e.target;
  const project = form.name;
  const { username, password, rest, endpoint, parameter, body } = form;
  const authHeader =
    username?.value && password?.value
      ? `Basic ${btoa(`${username.value}:${password.value}`)}`
      : null;

  const req = {
    body: {
      project,
      authHeader,
      method: rest.value,
      endpoint: endpoint.value,
      parameter: parameter.value,
      body: body.value,
    },
  };

  const router = {
    "spring-security": async () => updateSpringSecView(req),
    "authors-novels": async () => updateAuthorsNovView(req),
    "cab-booking": async () => updateCabBookingView(req),
    "maven-library": async () => updateMavenLibView(req),
    "coin-api": async () => updateCoinApiView(req),
  };

  await router[project]();
};
