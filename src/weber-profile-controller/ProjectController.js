import { AppController } from "./AppController.js";

export class ProjectController extends AppController {
  constructor(service) {
    super();
    this.#service = service;
  }

  #service;

  putEndpointsInSelection(req, res) {
    super.PUT(req, res, () =>
      this.#service.putEndpointsInSelection(req.body.routes, req.body.formId),
    );
  }
}
