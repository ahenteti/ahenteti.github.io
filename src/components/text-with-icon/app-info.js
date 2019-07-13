class AppInfo extends HTMLElement {
  constructor () {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
  }

  connectedCallback () {
    this._root.innerHTML = /* html */`
      <style>
        :host {
          --icon-background-color: #3282C9;
          --icon-color: #FFF;
          --text-background-color: #F3F8FD;
          --text-color: #004085;
        }
      </style>
      <app-text-with-icon icon="ios-information-circle">
        <slot></slot>
      </app-text-with-icon>
      
    `;
  }
}

window.customElements.define('app-info', AppInfo);
