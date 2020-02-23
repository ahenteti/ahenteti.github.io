import ElementWebComponent from '../element-webcomponent';

class ToolTitleWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._title = this.getAttribute('tool-title');
    this._root.innerHTML += /* html */ `
      <style>
        h1 {
          font-size: 5rem;
          color: var(--title-color);
          position: relative;
          padding-bottom: 3rem;
          margin-bottom: 5rem;
        }

        h1::after {
          content: "";
          position: absolute;
          display: block;
          height: .5rem;
          width: 85%;
          top: 100%;
          background: linear-gradient(to right, var(--primary-color), var(--tool-background-color));
        }
      </style>
      <div class="container">
        <h1>${this._title}</h1>
      </div>
    `;
  }
}

window.customElements.define('tool-title-webcomponent', ToolTitleWebComponent);
