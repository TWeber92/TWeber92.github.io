import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class SpringSecurityRepository extends DocumentClient {
  constructor(view, render, profile) {
    super();
    this.#entity = view.entity;
    this.#render = render;
    this.#profile = profile;
  }

  #entity;
  #render;
  #profile;

  get entity() {
    return this.#entity;
  }
  async getSecurityTableSchema(project) {
    return await this.#profile.GET(`/api/v1/project?projectName=${project}`);
  }
  async getInfyBankCustomers(endpoint, method, auth) {
    return await this.#render.GET(endpoint, method, { Authorization: auth });
  }

  async getBankCustomerById(endpoint, method, auth) {
    return await this.#render.GET(endpoint, method, {
      Authorization: auth,
    });
  }
  async postCustomerToBank(endpoint, method, auth, payload) {
    return await this.#render.POST(
      endpoint,
      method,
      {
        Authorization: auth,
      },
      payload,
    );
  }
  async putNewEmailInCustomerById(endpoint, method, auth, payload) {
    return await this.#render.PUT(
      endpoint,
      method,
      {
        Authorization: auth,
      },
      payload,
    );
  }
  async deleteBankCustomer(endpoint, method, auth) {
    console.log(endpoint, method, auth);
    return await this.#render.DELETE(endpoint, method, {
      Authorization: auth,
    });
  }

  putAuthGroupInClientDisplay(key) {
    super.PUT(key, (k) => {
      const security = this.#entity[k];
      const form = security.children[k];
      const authGroup = form.children.auth;
      authGroup.hidden = false;
    });
  }
  getSecurityTablesFromDataBase(database) {
    return super.GET(database, (db) => {
      const customersTable = db.children.customers.firstChild;
      const customersHead = customersTable.children.thead.firstChild;
      const headRow = customersHead.children;
      return { customersTable, headRow };
    });
  }
}
