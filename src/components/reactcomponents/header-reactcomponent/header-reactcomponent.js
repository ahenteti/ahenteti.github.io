import * as React from 'react';

import style from './header-reactcomponent.module.scss';

class HeaderReactComponent extends React.Component {
  render() {
    return (
      <header className={style.header}>
        <nav>
          <ul>
            <li className={style.left}>
              <a className={style.home} href='/'>
                <logo-webcomponent></logo-webcomponent>
                <span>ahenteti notes</span>
              </a>
            </li>
            <li className={style.right}>
              <a className='tooltip-bottom' href='/about.html' data-tooltip='about'>
                <ion-icon name='contact'></ion-icon>
              </a>
              <a className='tooltip-bottom' href='https://github.com/ahenteti' target='_blank' data-tooltip='github'>
                <ion-icon name='logo-github'></ion-icon>
              </a>
              <a
                className='tooltip-bottom'
                href='https://stackoverflow.com/users/6815416/a-henteti'
                target='_blank'
                data-tooltip='stackoverflow'
              >
                <ion-icon name='logo-buffer'></ion-icon>
              </a>
              <div className={style.changeThemeContainer}>
                <div className='tooltip-bottom' data-tooltip='change theme color'>
                  <ion-icon name='contrast'></ion-icon>
                </div>
                <highlight-feature-webcomponent></highlight-feature-webcomponent>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderReactComponent;
