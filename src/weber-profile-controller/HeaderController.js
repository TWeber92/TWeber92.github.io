import { AppController } from "./AppController.js";

export class HeaderController extends AppController {
  constructor(service) {
    super()
    this.#service = service;
  }

  #service;

  putContextInHeader(req, res){
    super.PUT(req, res, () => this.#service.putContextInHeader())
  }

  putMenuNavOnOffDisplay(req, res) {
    super.PUT(req, res, () =>
      this.#service.putMenuNavOnOffDisplay(req.body.menuBtn),
    );
  }
}
