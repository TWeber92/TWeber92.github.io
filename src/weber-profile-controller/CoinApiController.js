import { AppController } from "./AppController.js";

export class CoinApiController extends AppController {
  constructor(service) {
    super();
    this.#service = service;
  }

  #service;
}
