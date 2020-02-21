import ElementWebComponent from './element-webcomponent';

class TagWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
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
          display: block;
          transition: var(--transition);
          transition-property: color, background;
          cursor: pointer;
        }
      </style>
      <span class="tag">${this._value}</span>
    `;
  }
}

window.customElements.define('tag-webcomponent', TagWebComponent);
