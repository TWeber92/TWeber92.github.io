import { Application } from "../src/Application.js";

export const handler = async (e) => {
  let responseBody;
  const direction = e.target.id;
  const { carouselController } = Application.controllers;
  const req = { body: {} };
  const res = { obj: (data) => (responseBody = data) };

  const router = {
    next: async () => await carouselController.postNextProjectSlide(req, res), //args - none
    prev: async () =>
      await carouselController.postPreviousProjectSlide(req, res), // args - none
  };

  router[direction]();
};
