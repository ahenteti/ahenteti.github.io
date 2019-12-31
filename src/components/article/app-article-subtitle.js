class AppArticleSubTitle extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
  }

  connectedCallback() {
    this._title = this.getAttribute('subtitle');
    this._root.innerHTML = /* html */ `
      <style>
        h2 {
          font-size: 2rem;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: .3rem solid var(--border-color);
        }
      </style>
      <h2>${this._title}</h2>
    `;
  }
}

window.customElements.define('app-article-subtitle', AppArticleSubTitle);
