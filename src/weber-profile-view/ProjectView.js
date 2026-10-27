export class ProjectView {
  #project;
  #terminal;
  #table;
  #th;
  #tr;
  #td;
  #client;
  #option;
  #entity
  constructor(data) {
    this.#entity = {}
    this.#html = data;
  }

  get entity() {
    return this.#entity;
  }

  set #html(data) {
    this.#project = `
                <div id="project" hidden></div>`;
    this.#terminal = `
                <div id="terminal">
                  <pre>// Waiting for request...</pre>
                </div>`;
    this.#table = `
                <table id="table">
                  <thead id="thead">
                    <tr><th></th></tr>
                  </thead>
                  <tbody id="tbody">
                    <tr><td></td></tr>
                  </tbody>
                </table>`;
    this.#client = `
                <form id="${data.key}">
                  <div>
                    <select name="rest">
                      <option value="${data.GET}">${data.GET}</option>
                      <option value="${data.POST}">${data.POST}</option>
                      <option value="${data.PUT}">${data.PUT}</option>
                      <option value="${data.DELETE}">${data.DELETE}</option>
                    </select>
                    <select id="endpoint" name="endpoint">
                    </select>
                    <input type="text" placeholder="{id}" hidden />
                    <button type="button">Body</button>
                    <div id="auth" hidden>
                      <label>
                        <span>Username</span>
                        <input type="text" name="username" value="smith" />
                      </label>
                      <label>
                        <span>Password</span>
                        <input type="password" name="password" value="smith123" />
                      </label>
                    </div>
                    <button type="submit"></button>
                  </div>
                  <div hidden>
                    <textarea name="body"placeholder="Enter raw JSON here...">
                    </textarea>
                  </div>
                </form>`;
    this.#option = `
                <option id="option"></option>`;
  }

  #to() {
    return {
      project: this.#project,
      terminal: this.#terminal,
      table: this.#table,
      th: this.#th,
      tr: this.#tr,
      td: this.#td,
      client: this.#client,
      option: this.#option,
    };
  }
  static from(data) {
    return new ProjectView(data).#to();
  }
}
