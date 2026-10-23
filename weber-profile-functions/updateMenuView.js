import { Application } from "../src/Application.js";

export const handler = async (e) => {
  const menuBtn = e.target;
  const headerController = Application.controllers.headerController;
  const req = { body: { menuBtn } };
  await headerController.putMenuNavOnOffDisplay(req, ""); //args - menuBtn
};
