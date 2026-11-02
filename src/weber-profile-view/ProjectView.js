export class ProjectView {
  #project;
  #terminal;
  #table;
  #th;
  #tr;
  #td;
  #client;
  #option;
  #dashboard;
  #card;
  #entity;
  constructor(data) {
    this.#entity = {};
    this.#html = data;
  }

  get entity() {
    return this.#entity;
  }

  set #html(data) {
    this.#project = `
                <div id="project" hidden></div>`;
    this.#terminal = `
                <details id="terminal">
                  <summary>View Raw API Response</summary>
                  <pre id="output"><code>// Waiting...</code></pre>
                </details>`;
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
                    </select>
                    <select id="endpoint" name="endpoint">
                    </select>
                    <input name="parameter" type="text" placeholder="{id}" hidden />
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
                    <button type="submit">submit</button>
                  </div>
                  <div hidden>
                    <textarea name="body"placeholder="Enter raw JSON here...">
                    </textarea>
                  </div>
                </form>`;
    this.#option = `
                <option id="option"></option>`;
    this.#dashboard = `<div id="dashboard"></div>`;
    this.#card = `<div id="card"></div>`;
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
      dashboard: this.#dashboard,
      card: this.#card,
    };
  }
  static from(data) {
    return new ProjectView(data).#to();
  }
}
