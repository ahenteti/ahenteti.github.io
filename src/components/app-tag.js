class AppTag extends HTMLElement {
  constructor () {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
  }

  connectedCallback () {
    this._value = this.getAttribute('value');
    this._root.innerHTML = /* html */`
      <style>
        @import "${this._commonCss}";
        :host(:hover) span, :host(.selected) span {
          background-color: var(--primary-color);
          color: white;
        }
        span {
          background-color: var(--tag-background-color);
          font-size: var(--tag-font-size, 1.5rem);
          border-radius: .3rem;
          padding: .5rem 1rem;
          transition: all .1s ease-in;
          display: block;
        }
      </style>
      <span class="tag">${this._value}</span>
    `;
  }
}

window.customElements.define('app-tag', AppTag);
