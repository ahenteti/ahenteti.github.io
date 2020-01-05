import ElementWebComponent from './element-webcomponent';

class __COMPONENT_CLASS_NAME__ extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._root.innerHTML += /* html */ `
      <style>
        
      </style>
      <div class="container">
      </div>
    `;
    this._container = this._root.querySelector('.container');
  }
}

window.customElements.define('__COMPONENT_NAME__', __COMPONENT_CLASS_NAME__);
