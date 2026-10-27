import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class AuthorsNovelsRepository extends DocumentClient {
  constructor(view) {
    super();
    this.#entity = view.entity;
  }

  #entity;

  get entity() {
    return this.#entity;
  }

  getAuthorsNovelsAuthorsTableSchema() {
    return {
      columns: ["ID", "Name"],
      rows: [
        { id: 1001, name: "Charles" },
        { id: 1002, name: "Some John" },
        { id: 1003, name: "Jane Doe" },
        { id: 1033, name: "Doyle the third" },
        { id: 1234, name: "hamilton jay 9999999" },
        { id: 3456, name: "New Auth uuu dar" },
        { id: 6666, name: "shgdhg" },
        { id: 9897, name: "Some name" },
      ],
    };
  }

  getAuthorsNovelsNovelsTableSchema() {
    return {
      columns: ["ID", "Title", "Year", "Author ID"],
      rows: [
        { id: 14, title: "New Novel", year: 2020, auth_id: 1001 },
        { id: 15, title: "Climbing for Experts", year: 2009, auth_id: 1003 },
        { id: 16, title: "39839", year: null, auth_id: null },
        {
          id: 19,
          title: "New Novel From AddNovel Component",
          year: 2999,
          auth_id: 1001,
        },
        { id: 20, title: "New Ages Two", year: 2000, auth_id: 1003 },
        { id: 23, title: "Bridgerton", year: 2021, auth_id: 1033 },
        { id: 29, title: "SOme Novel", year: 2023, auth_id: 1003 },
        { id: 31, title: "kwjk", year: 2021, auth_id: 1002 },
        { id: 32, title: "klhfejher2kjf", year: 2021, auth_id: 1001 },
        { id: 33, title: "jhekjfh", year: 2021, auth_id: 1001 },
        { id: 34, title: "e2ff", year: 2021, auth_id: 1001 },
        { id: 36, title: "kjk", year: 2021, auth_id: 1001 },
      ],
    };
  }
}
