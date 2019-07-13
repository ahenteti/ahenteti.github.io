class AppMoreInfo extends HTMLElement {
  constructor () {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
  }

  connectedCallback () {
    this._root.innerHTML = /* html */`
      <style>
        @import "${this._commonCss}";
        h2 {
          margin-top: 3rem;
          padding-bottom: 1rem;
        }
        
      </style>
      <h2>More Information</h2>
      <ul>
        <slot></slot>
      </ul>
    `;
  }
}

window.customElements.define('app-more-info', AppMoreInfo);

