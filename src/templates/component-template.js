class __COMPONENT_CLASS_NAME__ extends HTMLElement {
  constructor () {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
  }

  connectedCallback () {
    this._root.innerHTML = /* html */`
      <style>
        @import "${this._commonCss}";
        
      </style>
      
    `;
  }
}

window.customElements.define('__COMPONENT_NAME__', __COMPONENT_CLASS_NAME__);
