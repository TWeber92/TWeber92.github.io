export class ProjectController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  putEndpointsInSelection(req, res) {
    this.#service.putEndpointsInSelection(
      req.body.method,
      req.body.routes,
      req.body.project,
    );
    res.obj(null);
  }
  putInputControlsInClient(req, res) {
    this.#service.putInputControlsInClient(req.body.project, req.body.endpoint);
    res.obj(null);
  }
  putClientBodyOnOffDisplay(req, res) {
    this.#service.putClientBodyOnOffDisplay(req.body.project);
    res.obj(null);
  }
  handleTextAreaFormat(req, res) {
    const result = this.#service.handleTextAreaFormat(
      req.body.project,
      req.body.payload,
    );
    res.obj(result);
  }
}
