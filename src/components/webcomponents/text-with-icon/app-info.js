class AppInfo extends HTMLElement {
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
      <app-text-with-icon icon="ios-information-circle">
        <slot></slot>
      </app-text-with-icon>
      
    `;
    }
}

window.customElements.define('app-info', AppInfo);
