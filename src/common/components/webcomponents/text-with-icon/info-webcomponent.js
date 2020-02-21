import ElementWebComponent from '../element-webcomponent';

class InfoWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._root.innerHTML += /* html */ `
      <style>
        :host {
          --background-color: var(--info-component-background-color);
          --text-color: var(--info-component-text-color);
        }
      </style>
      <text-with-icon-webcomponent icon="info">
        <slot></slot>
      </text-with-icon-webcomponent>
      
    `;
  }
}

window.customElements.define('info-webcomponent', InfoWebComponent);
