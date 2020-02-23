import ElementWebComponent from '../element-webcomponent';

class InfoWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._root.innerHTML += /* html */ `
      <style>
        :host {
          --background-color: var(--error-component-background-color);
          --text-color: var(--error-component-text-color);
        }
      </style>
      <text-with-icon-webcomponent icon="error">
        <slot></slot>
      </text-with-icon-webcomponent>
      
    `;
  }
}

window.customElements.define('error-webcomponent', InfoWebComponent);
