import { DocumentStore } from "../DocumentStore.js";

export class CarouselView {
  #carousel;
  #active;
  #next;
  #prev;
  #span;
  #buttons;

  constructor(data) {
    this.#html = data;
  }

  get entity() {
    return {
      layout: this.#getProjectCarouselLayout(),
      carousel: this.#getCarouselNavElement(),
    };
  }

  #getProjectCarouselLayout() {
    return document.body.appendChild(
      DocumentStore.createDivElement({
        id: "project-layout",
        className: "project-carousel",
      }).node,
    );
  }
  #getCarouselNavElement() {//home of track and controls
    return document.body.appendChild(
      DocumentStore.createNavElement({
        id: "carousel-nav",
        className: "carousel-nav",
        ariaLabel: "Project Carousel",
      }).node,
    );
  }

  set #html(_) {
    this.#carousel = `
        <div id="track" class="carousel-track"></div>
        <div id="controls" class="carousel-controls">
          <button id="prev" data-option="prev" type="button" aria-label="Previous slide">‹</button>
          <div class="carousel-dots" id="carousel" role="tablist">
            <span id="prev" class="dot" data-option="prev" role="tab" aria-label="Slide 1"></span>
            <span id="active" class="dot" data-option="active" role="tab" aria-label="Slide 2"></span>
            <span id="next" class="dot" data-option="next" role="tab" aria-label="Slide 3"></span>
          </div>
          <button id="next" data-option="next" type="button" aria-label="Next slide">›</button>
        </div>`;
    this.#active = `
        <div id="active" class="carousel-slide" data-project>
          <div class="slide-card" data-option="active">
          </div>
        </div>`;
    this.#next = `
        <div id="next" class="carousel-slide" data-project>
          <div class="slide-card" data-option="next">
          </div>
        </div>`;
    this.#prev = `
        <div id="prev" class="carousel-slide" data-project>
          <div class="slide-card" data-option="prev">
          </div>
        </div>`;
    this.#buttons = `
        <button id="project" name="security">Spring REST Security</button>
        <button id="project" name="novels">Spring Novels</button>
        <button id="project" name="booking">Spring Cab Booking</button>
        <button id="project" name="maven">Maven Library</button>
        <button id="project" name="coinApi">Coin API</button>
        <button id="project" name="sitewise">AWS SiteWise</button>
        <a href="/coin-collection-frontend/" target="_blank" rel="noopener noreferrer">Quarter Map Demo</a>`;
  }

  #to() {
    return {
      carousel: this.#carousel,
      active: this.#active,
      next: this.#next,
      prev: this.#prev,
      span: this.#span,
      buttons: this.#buttons,
    };
  }

  static from(data) {
    return new CarouselView(data).#to();
  }
}
