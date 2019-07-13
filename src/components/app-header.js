class AppLogo extends HTMLElement {
  constructor () {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
  }

  connectedCallback () {
    this._root.innerHTML = /* html */`
      <style>
        @import "${this._commonCss}";

        header {
          background-color: white;
          width: 100%;
          padding-left: 10%; 
          padding-right: 10%; 
          position: fixed;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          transition: box-shadow .2s ease-in;
        }

        header.shadow {
          box-shadow: var(--box-shadow);
        }
        
        nav {
          width: 100%;
        }

        ul {
          width: 100%;
          margin: 0 auto;
          min-height: var(--header-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        li a {
          color: var(--color-gray-dark);
          margin: 0 .5rem;
          transition: var(--transition);
          font-weight: bold;
        }

        a:hover {
          color: var(--primary-color);
        }

        .home {
          display: flex;
          align-items: center;
        }

        app-logo {
          margin-right: 1rem;
        }

        ion-icon {
          font-size: 2.5rem;
        }

        .right {
          display: flex;
          align-items: center;
        }

      </style>
      <header>
        <nav>
          <ul>
            <li class="left">
              <a class="home" href="/">
                <app-logo></app-logo>
                <span>ahenteti notes</span>
              </a>
            </li>
            <li class="right">
              <a class="about" href="/about.html" title="about">
                <ion-icon name="contact"></ion-icon>
              </a>
              <a class="github" href="https://github.com/ahenteti" target="_blank" title="github">
                <ion-icon name="logo-github"></ion-icon>
              </a>
              <a class="github" href="https://stackoverflow.com/users/6815416/a-henteti" target="_blank" title="stackoverflow">
                <ion-icon name="logo-buffer"></ion-icon>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    `;

    const $appHeader = document.querySelector('app-header');
    const $header = $appHeader.shadowRoot.querySelector('header');
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll > 0) {
        $header.classList.add('shadow');
      } else {
        $header.classList.remove('shadow');
      }
    });
  }
}

window.customElements.define('app-header', AppLogo);
