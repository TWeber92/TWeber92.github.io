import { Project } from "../weber-profile-entity/Project.js";
import { SpringSecurityRoutes } from "../weber-profile-enum/SpringSecurityRoutes.js";
import { TerminalException } from "../weber-profile-exception/WeberProfileError.js";
import { ProjectService } from "./ProjectService.js";

export class SpringSecurityService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async putSpringSecurityProjectInSlide(button, slides) {
    const key = button.name;
    const rest = Object.keys(SpringSecurityRoutes);
    const schema = await this.#repo.getSecurityTableSchema(key);
    const table = super.putTableTogether(schema);
    super.putProjectInSlide(button, slides, rest, table);
    this.#repo.putAuthGroupInClientDisplay(key);
  }

  async getInfyBankCustomers(auth, project, method, endpoint) {
    const result = await this.#repo.getInfyBankCustomers(
      endpoint,
      method,
      auth,
    );
    return await super.handleGetRequest({
      result,
      project,
      formatSchema: (result) => [
        {
          columns: ["Customer ID", "Email", "Name", "Date of Birth"],
          rows: result.map((c) => ({
            customer_id: c.customerId,
            email: c.emailId,
            name: c.name,
            dob: c.dateOfBirth,
          })),
        },
      ],
    });
  }
}
