import ElementWebComponent from './element-webcomponent';

class MoreInfoWebComponent extends ElementWebComponent {
  connectedCallback() {
    this._root.innerHTML += /* html */ `
      <style>
        h2 {
          margin: 3rem 0 1.6rem;
          font-size: 3rem;
          font-weight: bold;
          line-height: 1.235;
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
