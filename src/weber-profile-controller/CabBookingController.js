export class CabBookingController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  async getCabBookings(req, res) {
    const result = this.#service.getCabBookings(
      req.body.project,
      req.body.method,
      req.body.endpoint,
      req.body.parameter,
    );
    res.obj(result || null)
  }

  putCabBookingProjectInSlide(req, res) {
    this.#service.putCabBookingProjectInSlide(
      req.body.button,
      req.body.carousel.slides,
    );
    res.obj(null);
  }
}
