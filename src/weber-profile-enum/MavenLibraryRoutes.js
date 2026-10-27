export const MavenLibraryRoutes = Object.freeze({
  GET: Object.freeze([
    "/api/library/books",
    "/api/library/memberByIsbn",
  ]),
  POST: Object.freeze([
    "/api/library/insertMember",
    "/api/library/insertBook",
  ]),
  PUT: Object.freeze([
    "/api/library/updateBookAuthor",
    "/api/library/assignMemberToBook",
  ]),
  DELETE: Object.freeze([
    "/api/library/deleteBook",
  ]),
});