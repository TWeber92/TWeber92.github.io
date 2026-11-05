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
  putClientBodyOnDisplay(req, res) {
    this.#service.putClientBodyOnDisplay(req.body.project);
    res.obj(null);
  }
}
