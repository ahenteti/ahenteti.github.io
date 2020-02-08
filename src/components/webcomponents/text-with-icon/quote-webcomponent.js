import ElementWebComponent from '../element-webcomponent';

class QuoteWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._author = this.getAttribute('author');
    this._root.innerHTML += /* html */ `
      <style>
        :host {
          --background-color: var(--quote-component-background-color);
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
      <text-with-icon-webcomponent icon="quote">
        <slot></slot>
        <p class=author>— ${this._author}</p>
      </text-with-icon-webcomponent>
    `;
  }
}

window.customElements.define('quote-webcomponent', QuoteWebComponent);
