import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class MavenLibraryRepository extends DocumentClient {
  constructor(view) {
    super();
    this.#entity = view.entity;
  }

  #entity;

  get entity() {
    return this.#entity;
  }

  getMavenMembersTableSchema() {
    return {
      columns: ["Member ID", "First Name", "Last Name"],
      rows: [
        { member_id: 1, first_name: "Tad", last_name: "Weber" },
        { member_id: 2, first_name: "Charles", last_name: "Smith" },
        { member_id: 3, first_name: "Jane", last_name: "Doe" },
      ],
    };
  }
  getMavenBooksTableSchema() {
    return {
      columns: ["ID", "Title", "Author", "ISBN", "Member ID"],
      rows: [
        {
          id: 1,
          title: "The [Great] Adventure",
          author: "J.R.R. Tolkien",
          isbn: "2345678901",
          memberId: 1,
        },
        {
          id: 2,
          title: "Harry Potter",
          author: "JK. Rowling",
          isbn: "1234567890",
          memberId: 2,
        },
        {
          id: 3,
          title: "Climbing for Experts",
          author: "Jane Doe",
          isbn: "0987654321",
          memberId: 1,
        },
      ],
    };
  }
}
