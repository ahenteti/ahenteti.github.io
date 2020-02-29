import ElementWebComponent from '../element-webcomponent';

class ToolTitleWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._title = this.getAttribute('tool-title');
    this._description = this.getAttribute('tool-description');
    this._root.innerHTML += /* html */ `
      <style>
        .container {
          position: relative;
        }

        .inner-container::after {
          content: "";
          position: absolute;
          display: block;
          height: .5rem;
          width: 85%;
          top: 100%;
          background: linear-gradient(to right, var(--primary-color), var(--tool-background-color));
        }

        h1 {
          font-size: 5rem;
          color: var(--title-color);
          position: relative;
          padding-bottom: 1.8rem;
        }

        p {
          font-size: 1.4rem;
          padding-bottom: 3rem;
          margin-bottom: 3rem;
          color: var(--text-color);
        }

      </style>
      <div class="container">
        <div class="inner-container">
          <h1>${this._title}</h1>
          <p>${this._description}</p>
        </div>
      </div>
    `;
  }
}

window.customElements.define('tool-title-webcomponent', ToolTitleWebComponent);
