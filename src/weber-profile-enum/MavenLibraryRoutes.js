export const MavenLibraryRoutes = Object.freeze({
  GET: Object.freeze({
    "/api/library/books": async (req, res, controller) =>
      controller.getLibraryBooks(req, res),
    "/api/library/memberByIsbn": async (req, res, controller) =>
      controller.getMemberByIsbn(req, res), // Expects { isbn: "..." } in req.body
  }),
  POST: Object.freeze({
    "/api/library/insertMember": async (req, res, controller) =>
      controller.insertMember(req, res), // Expects { firstName, lastName } in req.body
    "/api/library/insertBook": async (req, res, controller) =>
      controller.insertBook(req, res), // Expects { title, author, isbn } in req.body
  }),
  PUT: Object.freeze({
    "/api/library/updateBookAuthor": async (req, res, controller) =>
      controller.updateBookAuthor(req, res), // Expects { author, bookId } in req.body
    "/api/library/assignMemberToBook": async (req, res, controller) =>
      controller.assignMemberToBook(req, res), // Expects { memberId, isbn } in req.body
  }),
  DELETE: Object.freeze({
    "/api/library/deleteBook": async (req, res, controller) =>
      controller.deleteBook(req, res), // Expects { bookId } in req.body
  }),
});
