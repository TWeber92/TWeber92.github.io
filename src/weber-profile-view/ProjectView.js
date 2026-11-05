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
                <div id="projectSlide" hidden></div>`;
    this.#terminal = `
                <details id="terminal">
                  <summary>View Raw API Response</summary>
                  <pre id="output"><code>// Waiting...</code></pre>
                </details>`;
    this.#table = `
                <div id="database">
                  <table id="table">
                    <thead id="thead">
                      <tr><th></th></tr>
                    </thead>
                    <tbody id="tbody">
                      <tr><td></td></tr>
                    </tbody>
                  </table>
                </div>`;
    this.#client = `
                <form id="project-form" name="${data.key}">
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
                    <div id="controls">
                      <select id="rest" name="rest">
                        <option value="" disabled selected hidden>METHOD</option>
                      </select>
                      <select id="endpoint" name="endpoint">
                        <option value="" disabled selected hidden>Endpoint</option>
                      </select>
                      <input name="parameter" type="text" placeholder="{id}" hidden />
                      <button id="body" type="button">Body</button>
                      <button name="button" type="submit">submit</button>
                    </div>
                    <div id="textarea" hidden>
                      <textarea name="body" placeholder="Enter raw JSON here...">
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
