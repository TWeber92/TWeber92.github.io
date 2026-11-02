import { Application } from "../src/Application.js";

export const handler = async (e) => {
  let responseBody;
  const {
    springSecurityController,
    authorsNovelsController,
    cabBookingController,
    mavenLibraryController,
    coinApiController,
    sitewiseController,
    carouselController,
  } = Application.controllers;
  
  const button = e.target;

  const req = { body: { button } };
  const res = { obj: (data) => (responseBody = data) };
  await carouselController.getCarouselSlides(req, res); //args - none
  req.body.carousel = responseBody.to(); //CarouselDTO obj

  const router = {
    "spring-security": async () =>
      await springSecurityController.putSpringSecurityProjectInSlide(req, res), //args - button, carousel.slides
    "authors-novels": async () =>
      await authorsNovelsController.putAuthorsNovelsProjectInSlide(req, res), //args - button, carousel.slides
    "cab-booking": async () =>
      await cabBookingController.putCabBookingProjectInSlide(req, res), //args - button, carousel.slides
    "maven-library": async () =>
      await mavenLibraryController.putMavenLibraryProjectInSlide(req, res), //args - button, carousel.slides
    "coin-api": async () =>
      await coinApiController.putCoinApiProjectInSlide(req, res), //args - button, carousel.slides
    "iot-sitewise": async () =>
      await sitewiseController.putSitewiseProjectInSlide(req, res), //args - button, carousel.slides
  };

  router[button.name]();
};
