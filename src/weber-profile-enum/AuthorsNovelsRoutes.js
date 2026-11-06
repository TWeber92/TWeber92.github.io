export const AuthorsNovelsRoutes = Object.freeze({
  GET: Object.freeze({
    "/novels/authors": async (req, res, controller) =>
      controller.getAllAuthors(req, res), //args - method, endpoint
    "/novels/authors/{authorName}": async (req, res, controller) =>
      controller.getNovelsByAuthorName(req, res), //args - method, endpoint, parameter
    "/novels/authors/{authorName}/{year}": async (req, res, controller) =>
      controller.getNovelsByAuthorAndYear(req, res), //args - method, endpoint, parameter
  }),
  POST: Object.freeze({
    "/novels/authors": async (req, res, controller) =>
      controller.postAuthorToNovels(req, res), //args - method, endpoint, body
    "/novels": async (req, res, controller) =>
      controller.postNovelToCollection(req, res), //args - method, endpoint, body
  }),
  PUT: Object.freeze({
    "/novels/authors/{authorId}": async (req, res, controller) =>
      controller.putDataToAuthorById(req, res), //args - method, endpoint, parameter
    "/novels": async (req, res, controller) =>
      controller.putNovelData(req, res), //args - method, endpoint, body
  }),
  DELETE: Object.freeze({
    "/novels/authors/{authorId}": async (req, res, controller) =>
      controller.deleteAuthor(req, res), //args - method, endpoint, parameter
    "/novels/{novelId}": async (req, res, controller) =>
      controller.deleteNovel(req, res), //args - method, endpoint, parameter
  }),
});
