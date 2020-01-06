import * as commonConstants from 'common/constants';
import store from 'redux/store';
import { changeThemeColor } from 'redux/actions';
import ElementWebComponent from './element-webcomponent';

class LogoWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._root.innerHTML += /* html */ `
      <style>
        header {
          background-color: var(--header-background);
          width: 100%;
          position: fixed;
          top: 0;
          z-index: 100;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          transition: box-shadow .2s ease-in;
        }

        nav {
          width: 80%;
          max-width: 1400px;
          margin: 0 auto;
        }

        a {
          font-size: 1.7rem;
          text-decoration: none;
          transition: color 0.2s ease-in;
        }

        ul li {
          list-style-type: none;
        }

        header.shadow {
          box-shadow: var(--box-shadow);
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

        logo-webcomponent {
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

        .change-theme-container.first-visit {
          position: relative;
        }

        .change-theme-container highlight-feature-webcomponent {
          display: none;
        }
        .change-theme-container.first-visit highlight-feature-webcomponent {
          display: block;
          position: absolute;
          bottom: calc(-10rem - 2rem);
          left: -30rem;
        }

        [data-tooltip] {
          position: relative;
        }

        [data-tooltip]::before,
        [data-tooltip]::after {
          text-transform: initial;
          z-index: 99;
          visibility: hidden;
          opacity: 0;
          transition: visibility 0s, opacity 0.2s;
        }

        [data-tooltip]:hover::before,
        [data-tooltip]:hover::after {
          visibility: visible;
          opacity: 1;
        }

        [data-tooltip].tooltip-bottom::before {
          content: attr(data-tooltip);
          position: absolute;
          background-color: var(--tooltip-background-color);
          color: var(--tooltip-color);
          padding: 0.8rem 1.6rem;
          border-radius: 0.3rem;
          white-space: nowrap;
          font-size: 1.4rem;

          top: calc(100% + var(--tooltip-margin) + var(--tooltip-triangle-height));
          left: 50%;
          transform: translateX(-50%);
        }

        [data-tooltip].tooltip-bottom::after {
          content: '';
          position: absolute;
          border-top: none;
          border-right: var(--tooltip-triangle-height) solid transparent;
          border-bottom: var(--tooltip-triangle-height) solid var(--tooltip-background-color);
          border-left: var(--tooltip-triangle-height) solid transparent;

          top: calc(100% + var(--tooltip-margin));
          left: 50%;
          transform: translateX(-50%);
        }

      </style>
      <header>
        <nav>
          <ul>
            <li class="left">
              <a class="home" href="/">
                <logo-webcomponent></logo-webcomponent>
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
              <div class="change-theme-container">
                <div class="change-theme-color tooltip-bottom" data-tooltip="change theme color">
                  <ion-icon name="contrast"></ion-icon>
                </div>
                <highlight-feature-webcomponent></highlight-feature-webcomponent>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    `;
    const $body = document.querySelector('body');
    const $appHeader = document.querySelector('header-webcomponent');
    const $header = $appHeader.shadowRoot.querySelector('header');
    const $changeThemeContainer = $appHeader.shadowRoot.querySelector('.change-theme-container');
    const $changeColorTheme = $appHeader.shadowRoot.querySelector('.change-theme-color');
    $changeColorTheme.addEventListener('click', function() {
      $changeThemeContainer.classList.remove('first-visit');
      const currentTheme = window.localStorage.getItem(commonConstants.LOCAL_STORAGE_THEME_KEY);
      store.dispatch(changeThemeColor(currentTheme));
    });
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll > 0) {
        $header.classList.add('shadow');
      } else {
        $header.classList.remove('shadow');
      }
    });
    if (localStorage.getItem(commonConstants.LOCAL_STORAGE_CHANGE_THEME_FEATURE) === null) {
      $changeThemeContainer.classList.add('first-visit');
      localStorage.setItem(commonConstants.LOCAL_STORAGE_CHANGE_THEME_FEATURE, '');
    }
  }
}

window.customElements.define('header-webcomponent', LogoWebComponent);
