import { HtmlStore } from "../HtmlStore.js";
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
  async getInfyBankCustomers(endpoint, method, auth) {
    return await this.#render.API(endpoint, method, { Authorization: auth });
  }

  async getSecurityTableSchema(project) {
    return await this.#profile.GET(`/api/v1/project?projectName=${project}`);
  }

  putAuthGroupInClientDisplay(key) {
    super.PUT(key, (k) => {
      const security = this.#entity[k];
      const form = security.children[k];
      const authGroup = form.children.auth;
      authGroup.hidden = false;
    });
  }

  // getSecurityTableSchema() {
  //   return {
  //     columns: ["Customer ID", "Email", "Name", "Date of Birth"],
  //     rows: [
  //       {
  //         customer_id: 1,
  //         email: "charles@example.com",
  //         name: "Charles Smith",
  //         dob: "1985-04-12",
  //       },
  //       {
  //         customer_id: 2,
  //         email: "jane@example.com",
  //         name: "Jane Doe",
  //         dob: "1990-07-23",
  //       },
  //       {
  //         customer_id: 3,
  //         email: "robert@example.com",
  //         name: "Robert Brown",
  //         dob: "1978-11-05",
  //       },
  //     ],
  //   };
  // }
}
