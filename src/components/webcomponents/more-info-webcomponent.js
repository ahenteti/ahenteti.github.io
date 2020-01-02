import ElementWebComponent from './element-webcomponent';

class MoreInfoWebComponent extends ElementWebComponent {
  connectedCallback() {
    this._root.innerHTML += /* html */ `
      <style>
        h2 {
          margin-top: 3rem;
          font-size: 2rem;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
      </style>
      <h2>Inspiration & Resources</h2>
      <ul>
        <slot></slot>
      </ul>
    `;
  }
}

window.customElements.define('more-info-webcomponent', MoreInfoWebComponent);
