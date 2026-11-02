import { CabBookingRoutes } from "../weber-profile-enum/CabBookingRoutes.js";
import { ProjectService } from "./ProjectService.js";

export class CabBookingService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async putCabBookingProjectInSlide(button, slides) {
    const rest = Object.keys(CabBookingRoutes);
    const schemas = await this.#repo.getCabBookingTableSchema();
    console.log(schemas);
    
    const tables = super.putTableTogether(schemas);
    super.putProjectInSlide(button, slides, rest, tables);
  }
}
