import { AuthorsNovelsDTO } from "../weber-profile-dto/AuthorsNovelsDTO.js";
import { AuthorsNovelsRoutes } from "../weber-profile-enum/AuthorsNovelsRoutes.js";
import { ProjectService } from "./ProjectService.js";

export class AuthorsNovelsService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async getAllAuthors(project, method, endpoint) {
    const result = await this.#repo.getAllAuthors(endpoint, method);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { authors, novelDTOs } = AuthorsNovelsDTO.from({ result }).to();
      const schema = [...authors, ...novelDTOs];
      super.putTableTogether(schema, database);
    } else return response;
  }
  async getNovelsByAuthorName(project, method, endpoint, name) {
    endpoint = endpoint.replace("{authorName}", name);
    const result = await this.#repo.getNovelsByAuthorName(endpoint, method);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { novels } = AuthorsNovelsDTO.from({ result }).to();
      super.putTableTogether(novels, database);
    } else return response;
  }
  async getNovelsByAuthorAndYear(project, method, endpoint, parameter) {
    endpoint = endpoint.replace("{authorName}/{year}", parameter);
    const result = await this.#repo.getNovelsByAuthorAndYear(endpoint, method);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { novels } = AuthorsNovelsDTO.from({ result }).to();
      super.putTableTogether(novels, database);
    } else return response;
  }
  async postAuthorToNovels(project, method, endpoint, payload) {
    const result = await this.#repo.postAuthorToNovels(
      endpoint,
      method,
      payload,
    );
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { authorsTable, novelsTable } =
        this.#repo.getAuthorsNovelsTablesFromDataBase(database);
      const authorRow = { id: result.id, name: result.name };
      super.putRowIntoTable(authorsTable, authorRow);
      if (result.novelDTOs) {
        result.novelDTOs.forEach((n) => {
          const novelRow = {
            id: n.id,
            title: n.title,
            year: n.year,
            auth_id: n.authId,
          };
          super.putRowIntoTable(novelsTable, novelRow);
        });
      }
      await super.putProject(project)
    } else return response;
  }
  async postNovelToCollection(project, method, endpoint, payload) {
    const result = await this.#repo.postNovelToCollection(
      endpoint,
      method,
      payload,
    );
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { novelsTable } =
        this.#repo.getAuthorsNovelsTablesFromDataBase(database);
      const row = {
        id: result.id,
        title: result.title,
        year: result.year,
        auth_id: result.authId,
      };
      super.putRowIntoTable(novelsTable, row);
      await super.putProject(project)
    } else return response;
  }

  async putAuthorsNovelsProjectInSlide(button, slides) {
    const key = button.name;
    const slide = slides[button.dataset.pos];
    const projectCache = this.#repo.entity?.[key];
    if (projectCache)
      return super.putSelectedProjectInSlide(slide, projectCache);
    const rest = Object.keys(AuthorsNovelsRoutes);
    const schemas = await this.#repo.getAuthorsNovelsTableSchema(button.name);
    const tables = super.putTableTogether(schemas.data);
    super.putProjectInSlide(button, slide, rest, tables);
  }
  async putNewAuthorNameById(project, method, endpoint, parameter) {
    endpoint = endpoint.replace("{authorId}/{authorName}", parameter);
    const result = await this.#repo.putNewAuthorNameById(endpoint, method);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { authorsTable, authorsHeadRow } =
        this.#repo.getAuthorsNovelsTablesFromDataBase(database);
      const authorCol = authorsHeadRow.id;
      const cn = authorCol.id;
      const row = super.getRowByColumnValue(authorsTable, cn, result.id);
      if (row) row.children.name.textContent = result.name;
      await super.putProject(project)
    } else return response;
  }
  async putNovelData(project, method, endpoint, payload) {
    const result = await this.#repo.putNovelData(endpoint, method, payload);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { novelsTable, novelsHeadRow } =
        this.#repo.getAuthorsNovelsTablesFromDataBase(database);
      const novelsCol = novelsHeadRow.id;
      const cn = novelsCol.id;
      const row = super.getRowByColumnValue(novelsTable, cn, result.id);
      if (row) super.putNewValuesInRow(row, Object.keys(result), result);
      await super.putProject(project)
    } else return response;
  }

  async deleteAuthor(project, method, endpoint, id) {
    endpoint = endpoint.replace("{authorId}", id);
    const result = await this.#repo.deleteAuthor(endpoint, method);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { authorsTable, novelsTable, authorsHeadRow } =
        this.#repo.getAuthorsNovelsTablesFromDataBase(database);
      const authorCol = authorsHeadRow.id;
      const cn = authorCol.id;
      const row = super.getRowByColumnValue(authorsTable, cn, result.id);
      if (row) row.remove();
      if (result.novelDTOs) {
        result.novelDTOs.forEach((n) => {
          const novelRow = super.getRowByColumnValue(novelsTable, cn, n.id);
          if (novelRow) novelRow.remove();
        });
      }
      await super.putProject(project)
    } else return response;
  }
  async deleteNovel(project, method, endpoint, id) {
    endpoint = endpoint.replace("{novelId}", id);
    const result = await this.#repo.deleteNovel(endpoint, method);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { novelsTable, novelsHeadRow } =
        this.#repo.getAuthorsNovelsTablesFromDataBase(database);
      const novelsCol = novelsHeadRow.id;
      const cn = novelsCol.id;
      const row = super.getRowByColumnValue(novelsTable, cn, result.id);
      if (row) row.remove();
      await super.putProject(project)
    } else return response;
  }
}
