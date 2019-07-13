class AppLink extends HTMLElement {
  constructor () {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
  }

  connectedCallback () {
    this._href = this.getAttribute('href') || '#';
    this._label = this.getAttribute('label');
    this._root.innerHTML = /* html */`
      <style>
        @import "${this._commonCss}";
        li {
          display: flex;
          align-items: center;
          color: var(--primary-color);
        }
        ion-icon {
          font-size: 2rem;
          margin-right: .8rem;
          color: var(--color-gray-medium);
        }
        a {
          font-weight: bold;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
      <li>
        <ion-icon name="arrow-round-forward"></ion-icon>
        <a href="${this._href}" target="_blank">${this._label}</a>
      </li>
    `;
  }
}

window.customElements.define('app-link', AppLink);
