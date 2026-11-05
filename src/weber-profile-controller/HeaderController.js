export class HeaderController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  putContextInHeader(req, res) {
    this.#service.putContextInHeader(req);
    res.obj(null);
  }

  putMenuNavOnOffDisplay(req, res) {
    this.#service.putMenuNavOnOffDisplay(req.body.menuBtn);
    res.obj(null);
  }
}
