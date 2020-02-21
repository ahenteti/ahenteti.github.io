import ElementWebComponent from './element-webcomponent';

class LinkWebComponent extends ElementWebComponent {
  connectedCallback() {
    this._href = this.getAttribute('href') || '#';
    this._label = this.getAttribute('label');
    this._root.innerHTML = /* html */ `
      <style>
        li {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          color: var(--primary-color);
        }
        ion-icon {
          font-size: 1.5rem;
          margin-right: .8rem;
          color: var(--primary-color);
        }
        a {
          font-size: 1.6rem;
          color: var(--primary-color);
          text-decoration: none;
          font-weight: bold;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
      <li>
        <ion-icon name="caret-forward"></ion-icon>
        <a href="${this._href}" target="_blank">${this._label}</a>
      </li>
    `;
  }
}

window.customElements.define('link-webcomponent', LinkWebComponent);
