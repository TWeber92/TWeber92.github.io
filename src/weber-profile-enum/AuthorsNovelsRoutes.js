export const AuthorsNovelsRoutes = Object.freeze({
  GET: Object.freeze([
    "/novels/authors",
    "/novels/authors/{authorName}",
    "/novels/authors/{authorName}/{year}",
  ]),
  POST: Object.freeze(["/novels/authors", "/novels"]),
  PUT: Object.freeze(["/novels/authors/{id}"]),
  DELETE: Object.freeze(["/novels/authors/{authorId}", "/novels/{novelId}"]),
});
