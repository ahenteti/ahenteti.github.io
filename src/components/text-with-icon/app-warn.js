class AppWarn extends HTMLElement {
  constructor () {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
  }

  connectedCallback () {
    this._root.innerHTML = /* html */`
      <style>
        :host {
          --icon-background-color: #FFE399;
          --icon-color: #FFF;
          --text-background-color: #fff6e0;
          --text-color: #856404;
        }
      </style>
      <app-text-with-icon icon="ios-alert">
        <slot></slot>
      </app-text-with-icon>
      
    `;
  }
}

window.customElements.define('app-warn', AppWarn);
