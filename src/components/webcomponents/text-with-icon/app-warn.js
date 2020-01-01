class AppWarn extends HTMLElement {
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
      <app-text-with-icon icon="ios-alert">
        <slot></slot>
      </app-text-with-icon>
      
    `;
    }
}

window.customElements.define('app-warn', AppWarn);
