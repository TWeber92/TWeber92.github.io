import { Application } from "../src/Application.js";

export const handler = async (e) => {
  let responseBody;
  const { headerController } = Application.controllers;
  const req = {body: {}}
  const res = {obj: (data) => responseBody = data}

  await headerController.putContextInHeader(req, res) //args - none

};
