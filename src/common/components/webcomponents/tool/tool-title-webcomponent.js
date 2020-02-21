import ElementWebComponent from '../element-webcomponent';

class ToolTitleWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._title = this.getAttribute('tool-title');
    this._root.innerHTML += /* html */ `
      <style>
        h1 {
          font-size: 3rem;
          color: var(--title-color);
          position: relative;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }

        h1::after {
          content: "";
          position: absolute;
          display: block;
          height: 0.3rem;
          width: 100%;
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
