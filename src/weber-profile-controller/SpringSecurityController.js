export class SpringSecurityController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  getInfyBankCustomers(req, res) {
    const result = this.#service.getInfyBankCustomers(
      req.body.authHeader,
      req.body.project,
      req.body.method,
      req.body.endpoint,
    );
    res.obj(result || null);
  }

  putSpringSecurityProjectInSlide(req, res) {
    this.#service.putSpringSecurityProjectInSlide(
      req.body.button,
      req.body.carousel.slides,
    );
    res.obj(null);
  }
}
