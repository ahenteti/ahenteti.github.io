import AppElement from './app-element';

class AppMoreInfo extends AppElement {
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

window.customElements.define('app-more-info', AppMoreInfo);
