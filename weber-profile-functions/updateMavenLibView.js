import { Application } from "../src/Application.js";
import { TerminalException } from "../src/weber-profile-exception/WeberProfileError.js";
const mavenLibraryGET = {
  "/api/library/books": async (req, res, controller) =>
    controller.getLibraryBooks(req, res),
  "/api/library/memberByIsbn": async (req, res, controller) =>
    controller.getMemberByIsbn(req, res), // Expects { isbn: "..." } in req.body
};

const mavenLibraryPOST = {
  "/api/library/insertMember": async (req, res, controller) =>
    controller.insertMember(req, res), // Expects { firstName, lastName } in req.body
  "/api/library/insertBook": async (req, res, controller) =>
    controller.insertBook(req, res), // Expects { title, author, isbn } in req.body
};

const mavenLibraryPUT = {
  "/api/library/updateBookAuthor": async (req, res, controller) =>
    controller.updateBookAuthor(req, res), // Expects { author, bookId } in req.body
  "/api/library/assignMemberToBook": async (req, res, controller) =>
    controller.assignMemberToBook(req, res), // Expects { memberId, isbn } in req.body
};

const mavenLibraryDELETE = {
  "/api/library/deleteBook": async (req, res, controller) =>
    controller.deleteBook(req, res), // Expects { bookId } in req.body
};
export const handler = async (req) => {
  let responseBody;
  const { mavenLibraryController } = Application.controllers;
  const res = { obj: (data) => (responseBody = data) };
  const endpoint = req.body.endpoint;
  const method = req.body.method;
  const project = req.body.project;

  const route = `${method}:${project}`;

  const router = {
    "GET:maven-library": async () => {
      mavenLibraryGET[endpoint](req, res, mavenLibraryController);
      if (responseBody instanceof TerminalException) responseBody.toTerminal();
    },
    "POST:maven-library": async () => {
      mavenLibraryPOST[endpoint](req, res, mavenLibraryController);
    },
    "PUT:maven-library": async () => {
      mavenLibraryPUT[endpoint](req, res, mavenLibraryController);
    },
    "DELETE:maven-library": async () => {
      mavenLibraryDELETE[endpoint](req, res, mavenLibraryController);
    },
  };

  await router[route]();
};
