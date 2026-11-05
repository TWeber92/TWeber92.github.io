import { Application } from "../src/Application.js";
import { TerminalException } from "../src/weber-profile-exception/WeberProfileError.js";
const authorsNovelsGET = {
  "/novels/authors": async (req, res, controller) =>
    controller.getAllAuthors(req, res), //args - method, endpoint
  "/novels/authors/{authorName}": async (req, res, controller) =>
    controller.getNovelsByAuthorName(req, res), //args - method, endpoint, parameter
  "/novels/authors/{authorName}/{year}": async (req, res, controller) =>
    controller.getNovelsByAuthorAndYear(req, res), //args - method, endpoint, parameter
};

const authorsNovelsPOST = {
  "/novels/authors": async (req, res, controller) =>
    controller.postAuthorToNovels(req, res), //args - method, endpoint, body
  "/novels": async (req, res, controller) =>
    controller.postNovelToCollection(req, res), //args - method, endpoint, body
};

const authorsNovelsPUT = {
  "/novels/authors/{authorId}": async (req, res, controller) =>
    controller.putDataToAuthorById(req, res), //args - method, endpoint, parameter
  "/novels": async (req, res, controller) => controller.putNovelData(req, res), //args - method, endpoint, body
};

const authorsNovelsDELETE = {
  "/novels/authors/{authorId}": async (req, res, controller) =>
    controller.deleteAuthor(req, res), //args - method, endpoint, parameter
  "/novels/{novelId}": async (req, res, controller) =>
    controller.deleteNovel(req, res), //args - method, endpoint, parameter
};
export const handler = async (req) => {
  let responseBody;
  const { authorsNovelsController } = Application.controllers;
  const res = { obj: (data) => (responseBody = data) };
  const endpoint = req.body.endpoint;
  console.log(endpoint);

  const method = req.body.method;
  const project = req.body.project;

  const route = `${method}:${project}`;

  const router = {
    "GET:authors-novels": async () => {
      authorsNovelsGET[endpoint](req, res, authorsNovelsController);
      if (responseBody instanceof TerminalException) responseBody.toTerminal();
    },
    "POST:authors-novels": async () => {
      authorsNovelsPOST[endpoint](req, res, authorsNovelsController);
    },
    "PUT:authors-novels": async () => {
      authorsNovelsPUT[endpoint](req, res, authorsNovelsController);
    },
    "DELETE:authors-novels": async () => {
      authorsNovelsDELETE[endpoint](req, res, authorsNovelsController);
    },
  };

  await router[route]();
};
