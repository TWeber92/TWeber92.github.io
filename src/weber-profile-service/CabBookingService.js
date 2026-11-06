import { CabBookingRoutes } from "../weber-profile-enum/CabBookingRoutes.js";
import { ProjectService } from "./ProjectService.js";

export class CabBookingService extends ProjectService {
  constructor(repo, pRepo) {
    super(pRepo);
    this.#repo = repo;
  }

  #repo;

  async getCabBookings(project, method, endpoint, parameter) {
    const finalEndpoint = endpoint.replace("{bookingType}", parameter);
    const result = await this.#repo.getCabBookings(finalEndpoint, method);
    return await super.handleGetRequest({
      result,
      project,
      formatSchema: (data) => [
        {
          columns: ["Booking ID", "Customer", "Phone", "Type", "Cab No"],
          rows: data.map((b) => ({
            id: b.bookingId,
            customer: b.customerName,
            phone: b.phoneNo,
            type: b.bookingType,
            cab: b.cabDTO?.cabNo,
          })),
        },
      ],
    });
  }

  async putCabBookingProjectInSlide(button, slides) {
    const key = button.name;
    const slide = slides[button.dataset.pos];
    const projectCache = this.#repo.entity?.[key];
    if (projectCache)
      return super.putSelectedProjectInSlide(slide, projectCache);
    const rest = Object.keys(CabBookingRoutes);
    const schemas = await this.#repo.getCabBookingTableSchema(button.name);
    console.log(schemas);

    const tables = super.putTableTogether(schemas);
    super.putProjectInSlide(button, slide, rest, tables);
  }
}
