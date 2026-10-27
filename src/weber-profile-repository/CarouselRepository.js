import { HtmlStore } from "../HtmlStore.js";
import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class CarouselRepository extends DocumentClient {
  constructor(view) {
    super();
    this.#entity = view.entity;
  }
  #entity;

  get entity() {
    return this.#entity;
  }

  getSlidesFromCarousel() {
    return super.GET(
      this.#entity,
      ({ carousel }) => carousel.firstChild.children,
    );
  }
  getCarouselPartsWithHtml(html) {
    return super.GET(html, (t) => HtmlStore.from(t).nodes);
  }

  getSlideContainer(slide) {
    return super.GET(slide, (s) => s.firstChild);
  }

  putCarouselNavTogether(entity) {
    super.PUT(entity, ({ nav, slides }) => {
      //slides needs to be converted to iterable
      const { layout, carousel } = this.#entity;
      layout.append(carousel);
      carousel.append(...nav);
      carousel.firstChild.replaceChildren(...Object.values(slides)); //obj -> array spread
    });
  }

  putSlideTogether(assembly) {
    super.PUT(assembly, ({ cs, btn }) => cs.replaceChildren(btn));
  }
}
