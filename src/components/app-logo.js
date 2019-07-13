class AppLogo extends HTMLElement {
  constructor () {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
    this._size = this.getAttribute('size') || '25px';
  }

  connectedCallback () {
    this._root.innerHTML = /* html */`
      <style>
        @import "${this._commonCss}";
        .container {
          position: relative;
          width: ${this._size};
          height: ${this._size};
          border-radius: calc(${this._size} / 10);
          background: var(--primary-color);
        }

        .backslash, .slash, .underscore {
          position: absolute;
          background: white;
          height: calc(${this._size} / 7);
        }
        
        .backslash, .slash {
          left: calc(${this._size} / 8);
          width: 55.3%;
        }
        
        .backslash {
          top: calc(${this._size} / 15);
          transform-origin: bottom left;
          transform: rotate(45deg);
          border-bottom-left-radius: calc(${this._size} / 20);
          border-top-left-radius: calc(${this._size} / 20);
        }

        .slash {
          bottom: calc(${this._size} / 15);
          transform-origin: top left;
          transform: rotate(-45deg);
          border-bottom-left-radius: calc(${this._size} / 20);
          border-top-left-radius: calc(${this._size} / 20);
        }

        .underscore {
          bottom: calc(${this._size} / 8);
          right: calc(${this._size} / 8);
          height: calc(${this._size} / 10);
          width: 40%;
          border-radius: calc(${this._size} / 20);
        }

      </style>

      <div class="container">
        <div class="backslash"> </div>
        <div class="slash"> </div>
        <div class="underscore"> </div>
      </div>
    `;
  }
}

window.customElements.define('app-logo', AppLogo);
