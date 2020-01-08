import * as React from 'react';
import './header-reactcomponent.scss';
import * as commonConstants from '../../../common/constants';

class HeaderReactComponent extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll > 0) {
        this.header.classList.add('shadow');
      } else {
        this.header.classList.remove('shadow');
      }
    });
  }

  componentDidUpdate() {
    this.changeThemeContainer.classList.remove('unknown-change-theme-color-feature');
  }

  render() {
    return (
      <div ref={el => (this.header = el)} className='header-reactcomponent'>
        <nav>
          <ul>
            <li className='left'>
              <a className='home' href='/'>
                <logo-webcomponent></logo-webcomponent>
                <span>ahenteti notes</span>
              </a>
            </li>
            <li className='right'>
              <a className='about tooltip-bottom' href='/about.html' data-tooltip='about'>
                <ion-icon name='contact'></ion-icon>
              </a>
              <a
                className='github tooltip-bottom'
                href='https://github.com/ahenteti'
                target='_blank'
                data-tooltip='github'
              >
                <ion-icon name='logo-github'></ion-icon>
              </a>
              <a
                className='github tooltip-bottom'
                href='https://stackoverflow.com/users/6815416/a-henteti'
                target='_blank'
                data-tooltip='stackoverflow'
              >
                <ion-icon name='logo-buffer'></ion-icon>
              </a>
              <div
                ref={el => (this.changeThemeContainer = el)}
                className={
                  this.props.unknownChangeThemeColorFeature
                    ? 'change-theme-container unknown-change-theme-color-feature'
                    : 'change-theme-container'
                }
              >
                <div
                  onClick={this.props.changeThemeColor}
                  className='change-theme-color tooltip-bottom'
                  data-tooltip='change theme color'
                >
                  <ion-icon name='contrast'></ion-icon>
                </div>
                <highlight-feature-webcomponent></highlight-feature-webcomponent>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default HeaderReactComponent;
