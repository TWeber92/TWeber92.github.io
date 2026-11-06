export const SpringSecurityRoutes = Object.freeze({
  GET: Object.freeze({
    "/infybank/customers": async (req, res, controller) =>
      await controller.getInfyBankCustomers(req, res), //args - project, method, endpoint
    "/infybank/customer/{id}": async (req, res, controller) =>
      controller.getBankCustomerById(req, res), //args - project, method, endpoint, parameter
  }),
  POST: Object.freeze({
    "/infybank/customers": async (req, res, controller) =>
      await controller.postCustomerToBank(req, res), //args - project, method, endpoint, body
  }),
  PUT: Object.freeze({
    "/infybank/customer/{id}": async (req, res, controller) =>
      await controller.putDataToCustomerById(req, res), //args - project, method, endpoint, parameter
  }),
  DELETE: Object.freeze({
    "/infybank/customer/{id}": async (req, res, controller) =>
      await controller.deleteBankCustomer(req, res), //args - project, method, endpoint, parameter
  }),
});
