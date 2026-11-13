import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class MavenLibraryRepository extends DocumentClient {
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

  getTableRowCount(table) {
    return super.GET(table.children, ({ tbody }) => {
      const lastRow = tbody.lastChild;
      return parseInt(lastRow.cells[0].textContent) ?? 0;
    });
  }
  getMavenTablesFromDataBase(database) {
    return super.GET(database, (db) => {
      const booksTable = db.children.books.firstChild;
      const membersTable = db.children.members.firstChild;
      const membersHead = membersTable.children.thead.firstChild;
      const headRow = membersHead.children;
      return { booksTable, membersTable, headRow };
    });
  }


  async getMavenLibraryTableSchema(project) {
    return await this.#profile.GET(`/api/v1/project?projectName=${project}`);
  }
  async getMemberByIsbn(endpoint, method, payload) {
    method = "POST";
    return await this.#render.GET(endpoint, method, {}, payload);
  }
  async getLibraryMembers(endpoint, method) {
    return await this.#render.GET(endpoint, method);
  }

  async getLibraryBooks(endpoint, method) {
    return await this.#render.GET(endpoint, method);
  }

  async postBookToBooksTable(endpoint, method, payload) {
    return await this.#render.POST(endpoint, method, {}, payload);
  }

  async postMemberToMembersTable(endpoint, method, payload) {
    return await this.#render.POST(endpoint, method, {}, payload);
  }

  async putAuthorInBookById(endpoint, method, payload) {
    return await this.#render.PUT(endpoint, method, {}, payload);
  }

  async deleteBook(endpoint, method, payload) {
    return await this.#render.DELETE(endpoint, method, {}, payload);
  }
}
