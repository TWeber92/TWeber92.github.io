import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class AuthorsNovelsRepository extends DocumentClient {
  constructor(view, render, profile) {
    super();
    this.#entity = view.entity;
    this.#render = render;
    this.#profile = profile;
  }

  #entity;
  #render;
  #profile;

  get entity() {
    return this.#entity;
  }

  async getAuthorsNovelsTableSchema(project) {
    return await this.#profile.GET(`/api/v1/project?projectName=${project}`);
  }
  async getAllAuthors(endpoint, method) {
    console.log(method, endpoint);
    return await this.#render.GET(endpoint, method);
  }
  async getNovelsByAuthorName(endpoint, method) {
    return await this.#render.GET(endpoint, method);
  }
  async getNovelsByAuthorAndYear(endpoint, method) {
    return await this.#render.GET(endpoint, method);
  }
  async postAuthorToNovels(endpoint, method, payload) {
    return await this.#render.POST(endpoint, method, {}, payload);
  }
  async postNovelToCollection(endpoint, method, payload) {
    return await this.#render.POST(endpoint, method, {}, payload);
  }
  async putNewAuthorNameById(endpoint, method) {
    return await this.#render.PUT(endpoint, method);
  }
  async putNovelData(endpoint, method, payload) {
    return await this.#render.PUT(endpoint, method, {}, payload);
  }
  async deleteAuthor(endpoint, method) {
    return await this.#render.DELETE(endpoint, method);
  }
  async deleteNovel(endpoint, method) {
    return await this.#render.DELETE(endpoint, method);
  }

  getAuthorsNovelsTablesFromDataBase(database) {
    return super.GET(database, (db) => {
      const authorsTable = db.children.authors.firstChild;
      const novelsTable = db.children.novels.firstChild;
      const authorsHead = authorsTable.children.thead.firstChild;
      const novelsHead = novelsTable.children.thead.firstChild;
      const authorsHeadRow = authorsHead.children;
      const novelsHeadRow = novelsHead.children;
      return { authorsTable, novelsTable, authorsHeadRow, novelsHeadRow };
    });
  }
}
