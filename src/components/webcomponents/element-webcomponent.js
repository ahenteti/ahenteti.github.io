export default class AppElement extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css']; // use it only if you have to
  }

  connectedCallback() {
    this._root.innerHTML = /* html */ `
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        .container {
          font-size: var(--font-size);
        }
      </style>
    `;
  }
}

window.customElements.define('element-webcomponent', AppElement);
