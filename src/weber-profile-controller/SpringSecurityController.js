export class SpringSecurityController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  async getInfyBankCustomers(req, res) {
    const { authHeader, project, method, endpoint } = req.body;
    const result = await this.#service.getInfyBankCustomers(
      authHeader,
      project,
      method,
      endpoint,
    );
    res.obj(result || null);
  }

  async getBankCustomerById(req, res) {
    const { authHeader, project, method, endpoint, parameter } = req.body;
    const result = await this.#service.getBankCustomerById(
      authHeader,
      project,
      method,
      endpoint,
      parameter,
    );
    res.obj(result || null);
  }

  async postCustomerToBank(req, res) {
    const { authHeader, project, method, endpoint, payload } = req.body;
    const result = await this.#service.postCustomerToBank(
      authHeader,
      project,
      method,
      endpoint,
      payload,
    );
    res.obj(result || null);
  }

  async putNewEmailInCustomerById(req, res) {
    const { authHeader, project, method, endpoint, parameter, payload } =
      req.body;
    const result = await this.#service.putNewEmailInCustomerById(
      authHeader,
      project,
      method,
      endpoint,
      parameter,
      payload,
    );
    res.obj(result || null);
  }

  async putSpringSecurityProjectInSlide(req, res) {
    const { button, carousel } = req.body;
    await this.#service.putSpringSecurityProjectInSlide(
      button,
      carousel.slides,
    );
    res.obj(null);
  }
  async deleteBankCustomer(req, res) {
    const { authHeader, project, method, endpoint, parameter } = req.body;
    const result = this.#service.deleteBankCustomer(
      authHeader,
      project,
      method,
      endpoint,
      parameter,
    );
    res.obj(result || null)
  }
}
