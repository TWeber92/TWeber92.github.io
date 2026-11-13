export class AuthorsNovelsDTO {
  #result;
  constructor(data) {
    this.#result = data.result;
  }

  to() {
    this.allNovels = this.#result.flatMap((a) => a.novelDTOs ?? []);
    console.log(this.allNovels);
    
    return {
      authors: [
        {
          name: "authors",
          columns: ["ID", "Name"],
          rows: this.#result.map((a) => ({ id: a.id, name: a.name })),
        },
      ],
      novels: [
        {
          name: "novels",
          columns: ["ID", "Title", "Year", "Author ID"],
          rows: this.#result.map((n) => ({
            id: n.id,
            title: n.title,
            year: n.year,
            auth_id: n.authId,
          })),
        },
      ],
      novelDTOs: [
        {
          name: "novels",
          columns: ["ID", "Title", "Year", "Author ID"],
          rows: this.allNovels.map((n) => ({
            id: n.id,
            title: n.title,
            year: n.year,
            auth_id: n.authId,
          })),
        },
      ],
    };
  }

  static from(data) {
    return new AuthorsNovelsDTO(data);
  }
}
