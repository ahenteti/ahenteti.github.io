import ElementWebComponent from '../element-webcomponent';

class WarnWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._root.innerHTML += /* html */ `
      <style>
        :host {
          --background-color: var(--warn-component-background-color);
          --text-color: var(--warn-component-text-color);
        }
      </style>
      <text-with-icon-webcomponent icon="warning">
        <slot></slot>
      </text-with-icon-webcomponent>
      
    `;
  }
}

window.customElements.define('warn-webcomponent', WarnWebComponent);
