class AppFancyTitle extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this._commonCss = window.webpackManifest["common.css"];
  }

  connectedCallback() {
    this._value = this.getAttribute("value");
    this._root.innerHTML = /* html */ `
      <style>
        @import "${this._commonCss}";
        .fancy-title {
          margin: 2.5rem 0;
          color: var(--color-gray-medium);
          text-transform: uppercase;
          position: relative;
          line-height: 2rem;
          font-size: 2rem;
        }

        .fancy-title::before {
          content: "";
          display: inline-block;
          height: 1.6rem;
          width: 1.6rem;
          margin-right: 1rem;
          background: var(--primary-color);
        }

        .fancy-title::after {
          content: "";
          position: absolute;
          display: block;
          height: 0.3rem;
          width: 75%;
          bottom: -1rem;
          background: linear-gradient(to right, var(--primary-color), #fff);
        }
      </style>
      <h2 class="fancy-title">${this._value}</h2>
    `;
  }
}

window.customElements.define("app-fancy-title", AppFancyTitle);
