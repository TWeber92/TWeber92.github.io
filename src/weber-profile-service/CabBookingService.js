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
    const schema = [
      await this.#repo.getCabBookingCabsTableSchema(),
      await this.#repo.getCabBookingBookingsTableSchema(),
    ];
    super.putProjectInSlide(button, slides, rest, schema);
  }
}
