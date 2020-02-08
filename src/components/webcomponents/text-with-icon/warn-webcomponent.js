import ElementWebComponent from '../element-webcomponent';

class WarnWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._root.innerHTML += /* html */ `
      <style>
        :host {
          --icon-background-color: var(--warn-component-icon-background-color);
          --icon-color: var(--warn-component-icon-color);
          --text-background-color: var(--warn-component-text-background-color);
          --text-color: var(--warn-component-text-color);
        }
      </style>
      <text-with-icon-webcomponent icon="alert">
        <slot></slot>
      </text-with-icon-webcomponent>
      
    `;
  }
}

window.customElements.define('warn-webcomponent', WarnWebComponent);
