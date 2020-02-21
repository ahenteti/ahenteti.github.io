import ElementWebComponent from './element-webcomponent';

class ComingSoonWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._root.innerHTML += /* html */ `
      <style>
        .coming-soon {
          font-size: 2.5rem;
          font-family: 'Sriracha';
          color: white;
          background: var(--primary-color);
          padding: .3rem 4rem;
          border-radius: 3px;
          clip-path: polygon(100% 0, calc(100% - 1.2rem) 50%, 100% 100%, 0% 100%, 1.2rem 50%, 0% 0%);
          font-weight: 300;
        }

        .soon {
          font-weight: 600;
        }
      </style>
      <div class="container">
        <span class="coming-soon">COMING <span class="soon">SOON!</span></span>
      </div>
    `;
    this._container = this._root.querySelector('.container');
  }
}

window.customElements.define('coming-soon-webcomponent', ComingSoonWebComponent);
