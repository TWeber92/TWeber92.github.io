export class CabBookingController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  async getCabBookings(req, res) {
    const { project, method, endpoint, parameter } = req.body;
    const result = await this.#service.getCabBookings(
      project,
      method,
      endpoint,
      parameter,
    );
    res.obj(result || null);
  }

  async putCabBookingProjectInSlide(req, res) {
    const { button, carousel } = req.body;
    await this.#service.putCabBookingProjectInSlide(button, carousel.slides);
    res.obj(null);
  }

  async postNewCab(req, res) {
    const { project, method, endpoint, payload } = req.body;
    const result = await this.#service.postNewCab(project, method, endpoint, payload);
    res.obj(result || null);
  }
}
