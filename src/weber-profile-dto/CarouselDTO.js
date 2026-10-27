export class CarouselDTO {
  #slides;
  constructor(data) {
    this.#slides = data.slides;
  }

  to() {
    return {
      slides: this.#slides,
    };
  }

  static from(data) {
    return new CarouselDTO(data);
  }
}
