import { MavenLibraryDTO } from "../weber-profile-dto/MavenLibraryDTO.js";
import { MavenLibraryRoutes } from "../weber-profile-enum/MavenLibraryRoutes.js";
import { ProjectService } from "./ProjectService.js";

export class MavenLibraryService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async getLibraryBooks(project, method, endpoint) {
    const result = await this.#repo.getLibraryBooks(endpoint, method);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { books } = MavenLibraryDTO.from(result).to();
      super.putTableTogether(books, database);
    } else return response;
  }

  async getLibraryMembers(project, method, endpoint) {
    const result = await this.#repo.getLibraryMembers(endpoint, method);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { members } = MavenLibraryDTO.from(result).to();
      super.putTableTogether(members, database);
    } else return response;
  }

  async getMemberByIsbn(project, method, endpoint, payload) {
    const result = await this.#repo.getMemberByIsbn(endpoint, method, payload);
    const response = this.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { booksTable, membersTable, headRow } =
        this.#repo.getMavenTablesFromDataBase(database);
      const booksRow = super.getRowByColumnValue(
        booksTable,
        Object.keys(payload)[0],
        payload.isbn,
      );
      const memberCol = headRow.memberId;
      const fk = memberCol.id;
      const memberId = super.getCellValueById(booksRow, fk);
      if (memberId) super.getRowByCellValue(membersTable, fk, memberId);
    } else return response;
  }

  async postBookToBooksTable(project, method, endpoint, payload) {
    const result = await this.#repo.postBookToBooksTable(
      endpoint,
      method,
      payload,
    );
    const response = this.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { booksTable } = this.#repo.getMavenTablesFromDataBase(database);
      const lastId = this.#repo.getTableRowCount(booksTable);
      const row = { id: lastId + 1, ...payload };
      super.putRowIntoTable(booksTable, row);
      await super.putProject(project);
    } else return response;
  }

  async postMemberToMembersTable(project, method, endpoint, payload) {
    const result = await this.#repo.postMemberToMembersTable(
      endpoint,
      method,
      payload,
    );
    const response = this.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { membersTable } = this.#repo.getMavenTablesFromDataBase(database);
      const lastId = this.#repo.getTableRowCount(membersTable);
      const row = { member_id: lastId + 1, ...payload };
      super.putRowIntoTable(membersTable, row);
      await super.putProject(project);
    } else return response;
  }

  async putMavenLibraryProjectInSlide(button, slides) {
    const key = button.name;
    const slide = slides[button.dataset.pos];
    const projectCache = this.#repo.entity?.[key];
    if (projectCache)
      return super.putSelectedProjectInSlide(slide, projectCache);
    const rest = Object.keys(MavenLibraryRoutes);
    const schemas = await this.#repo.getMavenLibraryTableSchema(button.name);
    const tables = super.putTableTogether(schemas.data);
    super.putProjectInSlide(button, slide, rest, tables);
  }

  async putAuthorInBookById(project, method, endpoint, payload) {
    const result = await this.#repo.putAuthorInBookById(
      endpoint,
      method,
      payload,
    );
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { booksTable, headRow } =
        this.#repo.getMavenTablesFromDataBase(database);
      const idCol = headRow.id;
      const row = super.getRowByColumnValue(
        booksTable,
        idCol.id,
        payload.bookId,
      );
      if (row) row.children.author.textContent = payload.author;
      await super.putProject(project);
    } else return response;
  }

  async deleteBook(project, method, endpoint, payload) {
    const result = await this.#repo.deleteBook(endpoint, method, payload);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { booksTable } = this.#repo.getMavenTablesFromDataBase(database);
      const bookIdToDelete = payload.bookId;
      super.deleteRowFromTable(booksTable, bookIdToDelete);
      await super.putProject(project);
    } else return response;
  }
}
