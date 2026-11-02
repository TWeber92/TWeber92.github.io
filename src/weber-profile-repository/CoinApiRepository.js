import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class CoinApiRepository extends DocumentClient {
  constructor(view, cloudFlare, profile) {
    super();
    this.#entity = view.entity;
    this.#cloudFlare = cloudFlare;
    this.#profile = profile
  }

  #entity;
  #cloudFlare
  #profile
}
