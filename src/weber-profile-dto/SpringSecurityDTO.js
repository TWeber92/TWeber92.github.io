export class SpringSecurityDTO {
  #result;
  constructor(result) {
    this.#result = result;
  }

  to() {
    return {
      customers: [
        {
          name: "customers",
          columns: ["Customer ID", "Email", "Name", "Date of Birth"],
          rows: this.#result.map((c) => ({
            customer_id: c.customerId,
            email: c.emailId,
            name: c.name,
            dob: c.dateOfBirth,
          })),
        },
      ],
    };
  }

  static from(data) {
    return new SpringSecurityDTO(data);
  }
}
