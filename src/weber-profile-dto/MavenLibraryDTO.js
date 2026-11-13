export class MavenLibraryDTO {
  #result;
  constructor(result) {
    this.#result = result;
  }

  to() {
    return {
      members: [
        {
          name: "members",
          columns: ["Member ID", "First Name", "Last Name"],
          rows: this.#result.map((m) => ({
            member_id: m.memberId,
            firstName: m.firstName,
            lastName: m.lastName,
          })),
        },
      ],
      books: [
        {
          name: "books",
          columns: ["ID", "Title", "Author", "ISBN", "Member ID"],
          rows: this.#result.map((b) => ({
            id: b.id,
            title: b.title,
            author: b.author,
            isbn: b.isbn,
            member_id: b.memberId,
          })),
        },
      ],
    };
  }

  static from(data) {
    return new MavenLibraryDTO(data);
  }
}
