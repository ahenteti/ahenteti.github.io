class WarnWebComponent extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._commonCss = window.webpackManifest['common.css'];
    }

    connectedCallback() {
        this._root.innerHTML = /* html */ `
      <style>
        :host {
          --icon-background-color: var(--warn-component-icon-background-color);
          --icon-color: var(--warn-component-icon-color);
          --text-background-color: var(--warn-component-text-background-color);
          --text-color: var(--warn-component-text-color);
        }
      </style>
      <text-with-icon-webcomponent icon="ios-alert">
        <slot></slot>
      </text-with-icon-webcomponent>
      
    `;
    }
}

window.customElements.define('warn-webcomponent', WarnWebComponent);
