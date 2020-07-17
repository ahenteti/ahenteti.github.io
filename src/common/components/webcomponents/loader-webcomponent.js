import ElementWebComponent from './element-webcomponent';

class LoaderWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._root.innerHTML += /* html */ `
      <style>
        .container {
          display: none;
          position: absolute;
          left: 0px;
          top: 0px;
          width: 100%;
          height: 100%;
          z-index: 3;
          background: rgba(0, 0, 0, .2);
          transition: var(--transition);
          transition-property: background;
        }

        .container.show {
          display: block;
        }

        .loader {
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8rem;
          height: 8rem;
        }
        .loader div {
          animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          transform-origin: 4rem 4rem;
        }
        .loader div:after {
          content: ' ';
          display: block;
          position: absolute;
          width: .7rem;
          height: .7rem;
          border-radius: 50%;
          background: var(--primary-color);
          margin: -0.4rem 0 0 -0.4rem;
        }
        .loader div:nth-child(1) {
          animation-delay: -0.036s;
        }
        .loader div:nth-child(1):after {
          top: 6.3rem;
          left: 6.3rem;
        }
        .loader div:nth-child(2) {
          animation-delay: -0.072s;
        }
        .loader div:nth-child(2):after {
          top: 6.8rem;
          left: 5.6rem;
        }
        .loader div:nth-child(3) {
          animation-delay: -0.108s;
        }
        .loader div:nth-child(3):after {
          top: 7.1rem;
          left: 4.8rem;
        }
        .loader div:nth-child(4) {
          animation-delay: -0.144s;
        }
        .loader div:nth-child(4):after {
          top: 7.2rem;
          left: 4.0rem;
        }
        .loader div:nth-child(5) {
          animation-delay: -0.18s;
        }
        .loader div:nth-child(5):after {
          top: 7.1rem;
          left: 3.2rem;
        }
        .loader div:nth-child(6) {
          animation-delay: -0.216s;
        }
        .loader div:nth-child(6):after {
          top: 6.8rem;
          left: 2.4rem;
        }
        .loader div:nth-child(7) {
          animation-delay: -0.252s;
        }
        .loader div:nth-child(7):after {
          top: 6.3rem;
          left: 1.7rem;
        }
        .loader div:nth-child(8) {
          animation-delay: -0.288s;
        }
        .loader div:nth-child(8):after {
          top: 5.6rem;
          left: 1.2rem;
        }
        @keyframes loader {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      </style>
      <div class="container">
        <div class="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    `;
    this._container = this._root.querySelector('.container');

    this.show = function () {
      this._container.classList.add('show');
    };

    this.hide = function () {
      this._container.classList.remove('show');
    };
  }
}

window.customElements.define('loader-webcomponent', LoaderWebComponent);
