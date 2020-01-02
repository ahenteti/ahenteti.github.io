import AppElement from './element-webcomponent';

class AppTag extends AppElement {
  connectedCallback() {
    this._value = this.getAttribute('value');
    this._root.innerHTML += /* html */ `
      <style>
        :host(:hover) span, :host(.selected) span {
          background-color: var(--primary-color);
          color: var(--selected-tag-color);
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

window.customElements.define('tag-webcomponent', AppTag);
