export class CoinApiController {
  constructor(service) {
    this.#service = service;
  }

  #service;

  putCoinApiProjectInSlide(req, res) {
    console.log("here");
    
    const { button, carousel } = req.body;
    console.log("here");
    const result = this.#service.putCoinApiProjectInSlide(
      button,
      carousel.slides,
    );
    res.obj(result || null);
  }
}
