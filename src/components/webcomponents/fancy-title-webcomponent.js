import ElementWebComponent from './element-webcomponent';

class FancyTitleWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._value = this.getAttribute('value');
    this._root.innerHTML += /* html */ `
      <style>
        @import "${this._commonCss}";
        
        .fancy-title {
          margin: 2.5rem 0;
          color: var(--title-color);
          text-transform: uppercase;
          position: relative;
          line-height: 2rem;
          font-size: 2rem;
          background: linear-gradient(to right, var(--primary-color), var(--fancy-title-background-color));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .fancy-title::before {
          content: "";
          display: inline-block;
          height: 1.6rem;
          width: 1.6rem;
          margin-right: 1rem;
          background: var(--primary-color);
        }

        .fancy-title::after {
          content: "";
          position: absolute;
          display: block;
          height: 0.3rem;
          width: var(--fancy-title-underline-width, 75%);
          bottom: -1rem;
          background: linear-gradient(to right, var(--primary-color), var(--fancy-title-background-color));
        }
      </style>
      <div class="container">
        <h2 class="fancy-title">${this._value}</h2>
      </div>
    `;
    this._container = this._root.querySelector('.container');

    this.alreadyVisible = function() {
      const position = this.getBoundingClientRect();
      return position.top < 0 || (position.top < window.innerHeight && position.bottom >= 0);
    };

    this.addAlreadyVisibleClass = function() {
      this._container.classList.add('already-visible');
    };

    this.addNotYetVisibleClass = function() {
      this._container.classList.add('not-yet-visible');
    };

    this.addComeInClass = function() {
      this._container.classList.add('slide-in');
    };
  }
}

window.customElements.define('fancy-title-webcomponent', FancyTitleWebComponent);
