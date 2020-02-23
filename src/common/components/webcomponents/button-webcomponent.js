import ElementWebComponent from './element-webcomponent';

class ButtonWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._value = this.getAttribute('value');
    this._root.innerHTML += /* html */ `
      <style>
        .container {
          display: flex;
        }

        button {
          padding: 0.8rem 1.6rem;
          border-radius: 0.2rem;
          border: 1px solid var(--primary-color);
          background: var(--button-background-color);
          color: var(--primary-color);
          margin: 0 auto;
          transition: var(--transition);
          transition-property: color, background;
          font-family: "Roboto", sans-serif;
        }

        button:hover {
          background: var(--primary-color);
          color: white;
        }
        
      </style>
      <div class="container">
        <button>${this._value}</button>
      </div>
    `;
    this._container = this._root.querySelector('.container');
  }
}

window.customElements.define('button-webcomponent', ButtonWebComponent);
