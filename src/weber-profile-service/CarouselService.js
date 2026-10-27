import { CarouselDTO } from "../weber-profile-dto/CarouselDTO.js";
import { Carousel } from "../weber-profile-entity/Carousel.js";
import { CarouselView } from "../weber-profile-view/CarouselView.js";

export class CarouselService {
  constructor(repo) {
    this.#repo = repo;
  }

  #repo;
  #count;
  #index

  getCarouselSlides() {
    const slides = this.#repo.getSlidesFromCarousel();
    const entity = Carousel.from(slides);
    return CarouselDTO.from(entity.to());
  }

  getRandomIndex(count) {
    this.#count = count;
    const calc = (l) => Math.floor(Math.random() * l);
    return calc(count);
  }
  putCarouselAssemblyinNav() {
    const carousel = CarouselView.from({}).carousel;
    const { active, next, prev, buttons } = CarouselView.from({});
    const btns = this.#repo.getCarouselPartsWithHtml(buttons);
    this.#index = this.getRandomIndex(btns.length);
    const nodes = this.#repo.getCarouselPartsWithHtml(
      carousel + prev + active + next,
    );
    const entity = Carousel.from({
      navigation: [nodes.track, nodes.controls],
      prev: nodes.prev,
      active: nodes.active,
      next: nodes.next,
    }).to();
    this.#repo.putCarouselNavTogether(entity);
    this.putSlidesInPosition();
  }
  postPreviousProjectSlide() {
    const calc = (l, i) => (i - 1 + l) % l;
    this.#index = calc(this.#count, this.#index);
    this.putSlidesInPosition();
  }
  postNextProjectSlide() {
    const calc = (l, i) => (i + 1) % l;
    this.#index = calc(this.#count, this.#index);
    this.putSlidesInPosition();
  }
  async putSlidesInPosition() {
    const { buttons } = CarouselView.from({});
    const btns = this.#repo.getCarouselPartsWithHtml(buttons);
    const getButtons = (i) =>
      [i - 1 + this.#count, i, i + 1]
        .map((cal) => btns[cal % this.#count])
        .flat();
    const toView = getButtons(this.#index);
    const [prev, active, next] = this.#repo.getSlidesFromCarousel();
    const entity = Carousel.from({ prev, active, next }).to();
    Object.keys(entity.slides).forEach((key, i) => {
      const btn = toView[i];
      const slide = entity.slides[key];
      btn.dataset.pos = slide.id;
      const container = this.#repo.getSlideContainer(slide);
      this.#repo.putSlideTogether({ cs: container, btn });
    });
  }
}
