import { CabBookingDTO } from "../weber-profile-dto/CabBookingDTO.js";
import { CabBookingRoutes } from "../weber-profile-enum/CabBookingRoutes.js";
import { ProjectService } from "./ProjectService.js";

export class CabBookingService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async getCabBookings(project, method, endpoint, parameter) {
    endpoint = endpoint.replace("{bookingType}", parameter);
    const result = await this.#repo.getCabBookings(endpoint, method);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      const { bookings } = CabBookingDTO.from(result).to();
      const { database } = super.getProjectFromEntity(project);
      super.putTableTogether(bookings, database);
    } else return response;
  }

  async postNewCab(project, method, endpoint, payload) {
    const result = await this.#repo.postNewCab(endpoint, method, payload);
    const response = super.handleTerminal(project, result);
    if (response.success) {
      await super.putProject(project); // refresh OORT schema
      const schemas = await this.#repo.getCabBookingTableSchema(project);
      const { database } = super.getProjectFromEntity(project);
      super.putTableTogether(schemas.data, database);
    } else return response;
  }

  async putCabBookingProjectInSlide(button, slides) {
    const key = button.name;
    const slide = slides[button.dataset.pos];
    const projectCache = this.#repo.entity?.[key];
    if (projectCache)
      return super.putSelectedProjectInSlide(slide, projectCache);
    const rest = Object.keys(CabBookingRoutes);
    const schemas = await this.#repo.getCabBookingTableSchema(button.name);
    const tables = super.putTableTogether(schemas.data);
    super.putProjectInSlide(button, slide, rest, tables);
  }
}
