import { HtmlStore } from "../HtmlStore.js";
import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class SpringSecurityRepository extends DocumentClient {
  constructor(view) {
    super();
    this.#entity = view.entity;
  }

  #entity;

  get entity() {
    return this.#entity;
  }


  getSecurityTableSchema() {
    return {
      columns: ["Customer ID", "Email", "Name", "Date of Birth"],
      rows: [
        {
          customer_id: 1,
          email: "charles@example.com",
          name: "Charles Smith",
          dob: "1985-04-12",
        },
        {
          customer_id: 2,
          email: "jane@example.com",
          name: "Jane Doe",
          dob: "1990-07-23",
        },
        {
          customer_id: 3,
          email: "robert@example.com",
          name: "Robert Brown",
          dob: "1978-11-05",
        },
      ],
    };
  }

  putAuthGroupInClientDisplay(key) {
    super.PUT(key, (k) => {
      const security = this.#entity[k];
      const form = security.children[k];
      const authGroup = form.firstChild.children.auth;
      authGroup.hidden = false;
    });
  }
}
