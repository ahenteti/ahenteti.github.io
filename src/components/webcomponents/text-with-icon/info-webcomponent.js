import ElementWebComponent from '../element-webcomponent';

class InfoWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._root.innerHTML += /* html */ `
      <style>
        :host {
          --icon-background-color: var(--info-component-icon-background-color);
          --icon-color: var(--info-component-icon-color);
          --text-background-color: var(--info-component-text-background-color);
          --text-color: var(--info-component-text-color);
        }
      </style>
      <text-with-icon-webcomponent icon="information-circle">
        <slot></slot>
      </text-with-icon-webcomponent>
      
    `;
  }
}

window.customElements.define('info-webcomponent', InfoWebComponent);
