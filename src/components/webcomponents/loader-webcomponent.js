import ElementWebComponent from './element-webcomponent';

class LoaderWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._root.innerHTML += /* html */ `
      <style>
        .loader {
          display: none;
          position: absolute;
          top: calc(50% - 2.5rem);
          left: calc(50% - 2.5rem);
          border: 1rem solid var(--loader-primary-color);
          border-top: 1rem solid var(--primary-color);
          border-radius: 50%;
          width: 5rem;
          height: 5rem;
          animation: spin 2s linear infinite;
        }

        .container.show .loader{
          display: block;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      </style>
      <div class="container">
        <div class="loader"></div>
      </div>
    `;
    this._container = this._root.querySelector('.container');

    this.show = function() {
      this._container.classList.add('show');
    };

    this.hide = function() {
      this._container.classList.remove('show');
    };
  }
}

window.customElements.define('loader-webcomponent', LoaderWebComponent);
