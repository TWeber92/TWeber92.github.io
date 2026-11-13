import { DocumentClient } from "../weber-profile-client/DocumentClient.js";

export class CabBookingRepository extends DocumentClient {
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

  async getCabBookings(endpoint, method) {
    return await this.#render.GET(endpoint, method);
  }

  async getCabBookingTableSchema(project) {
    return await this.#profile.GET(`/api/v1/project?projectName=${project}`);
  }

  async postNewCab(endpoint, method, payload) {
    console.log(endpoint, method, payload);
    
    return await this.#render.POST(endpoint, method, {}, payload);
  }
}
