export class IoTSiteWiseView {
  #tree;
  #parentAsset;
  #childAsset;
  #line;
  #largeLine;
  #details;
  constructor(data) {
    this.#html = data;
  }

  set #html(data) {
    this.#tree = `
                    <div id="tree" class="dashboard-tree">
                       <svg id="canvas" viewBox="0 0 400 300">
                       </svg>
                    </div>`;
    this.#parentAsset = `
                    <g id="parentAsset" class="node-parent" data-id="${data.id}">
                       <rect x="100" y="20" width="200" height="60" rx="8" class="node-box active" />
                       <circle cx="120" cy="50" r="6" class="status-dot 
                                                        ${data.status === "ACTIVE" ? "green" : "red"}" />
                       <text x="140" y="45">${data.name}/text>
                       <text x="140" y="65" class="node-value">-- RPM</text>
                    </g> `;
    this.#childAsset = `
                    <g id="childAsset" class="node-child" data-id="${data.id}">
                      <rect id="rect" x="0" y="0" width="160" height="50" rx="6" class="node-box" />
                      <circle cx="15" cy="25" r="5" class="status-dot 
                                                        ${data.status === "ACTIVE" ? "green" : "red"}" />
                      <text x="30" y="22" class="child-name">${data.name}</text>
                      <text x="30" y="38" class="node-value">--</text>
                    </g>`;
    this.#line = `
                    <path class="edge" />`;
    this.#details = `
                    <div class="dashboard-detail">
                      <h4 id="title">${data.name}</h4>
                      <div id="gauge"></div>
                      <div id="sparkline"></div>
                    </div>`;
  }
  #to() {
    return {
      tree: this.#tree,
      parentAsset: this.#parentAsset,
      childAsset: this.#childAsset,
      line: this.#line,
      details: this.#details,
    };
  }

  static from(data) {
    return new IoTSiteWiseView(data).#to();
  }
}
