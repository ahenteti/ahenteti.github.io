class AppQuote extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._commonCss = window.webpackManifest['common.css'];
    }

    connectedCallback() {
        this._author = this.getAttribute('author');
        this._root.innerHTML = /* html */ `
      <style>
        @import "${this._commonCss}";
        :host {
          --icon-background-color: var(--quote-component-icon-background-color);
          --icon-color: var(--quote-component-icon-color);
          --text-background-color: var(--quote-component-text-background-color);
          --text-color: var(--quote-component-text-color);
          --text-font-style: var(--quote-component-text-font-style);
        }
        p.author {
          padding-top: 1rem;
          font-size: 1.3rem;
          font-weight: bold;
          float: right;
          color: var(--primary-color);
        }
      </style>
      <app-text-with-icon icon="ios-quote">
        <slot></slot>
        <p class=author>— ${this._author}</p>
      </app-text-with-icon>
    `;
    }
}

window.customElements.define('app-quote', AppQuote);
