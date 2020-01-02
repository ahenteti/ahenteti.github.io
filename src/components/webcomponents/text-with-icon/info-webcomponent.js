class InfoWebComponent extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
  }

  connectedCallback() {
    this._root.innerHTML = /* html */ `
      <style>
        :host {
          --icon-background-color: var(--info-component-icon-background-color);
          --icon-color: var(--info-component-icon-color);
          --text-background-color: var(--info-component-text-background-color);
          --text-color: var(--info-component-text-color);
        }
      </style>
      <text-with-icon-webcomponent icon="ios-information-circle">
        <slot></slot>
      </text-with-icon-webcomponent>
      
    `;
  }
}

window.customElements.define('info-webcomponent', InfoWebComponent);
