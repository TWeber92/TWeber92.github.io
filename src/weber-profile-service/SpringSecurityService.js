import { SpringSecurityDTO } from "../weber-profile-dto/SpringSecurityDTO.js";
import { SpringSecurityRoutes } from "../weber-profile-enum/SpringSecurityRoutes.js";
import { ProjectService } from "./ProjectService.js";

export class SpringSecurityService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async getInfyBankCustomers(auth, project, method, endpoint) {
    const result = await this.#repo.getInfyBankCustomers(
      endpoint,
      method,
      auth,
    );
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { customers } = SpringSecurityDTO.from(result);
      super.putTableTogether(customers, database);
    } else return response;
  }
  async putSpringSecurityProjectInSlide(button, slides) {
    const key = button.name;
    const slide = slides[button.dataset.pos];
    const projectCache = this.#repo.entity?.[key];
    if (projectCache)
      return super.putSelectedProjectInSlide(slide, projectCache);
    const rest = Object.keys(SpringSecurityRoutes);
    const schema = await this.#repo.getSecurityTableSchema(key);
    const table = super.putTableTogether(schema.data);
    super.putProjectInSlide(button, slide, rest, table);
    this.#repo.putAuthGroupInClientDisplay(key);
  }
  async getBankCustomerById(auth, project, method, endpoint, id) {
    endpoint = endpoint.replace("{id}", id);
    const result = await this.#repo.getBankCustomerById(endpoint, method, auth);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { customersTable, headRow } =
        this.#repo.getSecurityTablesFromDataBase(database);
      const customerCol = headRow.customerId;
      const cn = customerCol.id;
      super.getRowByCellValue(customersTable, cn, id);
    } else return response;
  }

  async postCustomerToBank(auth, project, method, endpoint, payload) {
    const result = await this.#repo.postCustomerToBank(
      endpoint,
      method,
      auth,
      payload,
    );
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { customersTable } =
        this.#repo.getSecurityTablesFromDataBase(database);
      const customerId = parseInt(result.match(/(\d+)$/)[1], 10);
      const row = {
        customerId,
        emailId: payload.emailId,
        name: payload.name,
        dateOfBirth: payload.dateOfBirth,
      };
      super.putRowIntoTable(customersTable, row);
      await super.putProject(project);
    } else return response;
  }

  async putNewEmailInCustomerById(
    auth,
    project,
    method,
    endpoint,
    id,
    payload,
  ) {
    endpoint = endpoint.replace("{id}", id);
    const result = await this.#repo.putNewEmailInCustomerById(
      endpoint,
      method,
      auth,
      payload,
    );
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { customersTable, headRow } =
        this.#repo.getSecurityTablesFromDataBase(database);
      const customerCol = headRow.customerId;
      const cn = customerCol.id;
      const row = super.getRowByColumnValue(customersTable, cn, id);
      if (row) row.children.emailId.textContent = payload.emailId;
      await super.putProject(project);
    } else return response;
  }

  async deleteBankCustomer(auth, project, method, endpoint, id) {
    endpoint = endpoint.replace("{id}", id);
    const result = await this.#repo.deleteBankCustomer(endpoint, method, auth);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { database } = super.getProjectFromEntity(project);
      const { customersTable, headRow } =
        this.#repo.getSecurityTablesFromDataBase(database);
      const customerCol = headRow.customerId;
      const cn = customerCol.id;
      const row = super.getRowByColumnValue(customersTable, cn, id);
      if (row) row.remove();
      await super.putProject(project);
    } else return response;
  }
}
