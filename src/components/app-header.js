import { LOCAL_STORAGE_THEME } from '../common/constants';

class AppLogo extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._commonCss = window.webpackManifest['common.css'];
    }

    connectedCallback() {
        this._root.innerHTML = /* html */ `
      <style>
        @import "${this._commonCss}";

        header {
          background-color: var(--header-background);
          width: 100%;
          padding-left: 10%; 
          padding-right: 10%; 
          position: fixed;
          top: 0;
          z-index: 100;
          display: flex;
          flex-wrap: wrap;
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
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }

        li.left a, li.right ion-icon {
          color: var(--header-link-color);
          margin: 0 1rem;
          transition: var(--transition);
          font-weight: bold;
        }

        li.left {
          margin-left: -1rem;
        }

        li.right {
          margin-right: -1rem;
        }

        li.left a:hover, li.right ion-icon:hover {
          color: var(--primary-color);
        }

        .home {
          display: flex;
          flex-wrap: wrap;
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
          flex-wrap: wrap;
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
              <a class="about tooltip-bottom" href="/about.html" data-tooltip="about">
                <ion-icon name="contact"></ion-icon>
              </a>
              <a class="github tooltip-bottom" href="https://github.com/ahenteti" target="_blank" data-tooltip="github">
                <ion-icon name="logo-github"></ion-icon>
              </a>
              <a class="github tooltip-bottom" href="https://stackoverflow.com/users/6815416/a-henteti" target="_blank" data-tooltip="stackoverflow">
                <ion-icon name="logo-buffer"></ion-icon>
              </a>
              <div class="change-theme-color tooltip-bottom" data-tooltip="change theme color">
                <ion-icon name="contrast"></ion-icon>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    `;
        const $body = document.querySelector('body');
        const $appHeader = document.querySelector('app-header');
        const $header = $appHeader.shadowRoot.querySelector('header');
        const $changeColorTheme = $appHeader.shadowRoot.querySelector('.change-theme-color');
        $changeColorTheme.addEventListener('click', function() {
            $body.classList.toggle('dark');
            window.localStorage.setItem(LOCAL_STORAGE_THEME, $body.className);
        });
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
