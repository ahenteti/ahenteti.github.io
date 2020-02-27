import ElementWebComponent from '../element-webcomponent';

class TextWithIconWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._icon = this.getAttribute('icon');
    this._root.innerHTML += /* html */ `
    <style>
        .container {
          display: flex;
          flex-wrap: wrap;
          background: var(--background-color);
          border-radius: .3rem;
          padding: 2rem;
          align-items: flex-start;
        }

        .icon {
          flex: 0 0 var(--container-prefix-width);
          padding-right: 2rem;
          width: 2rem;
        }

        .text {
          flex: 1;
          font-style: var(--text-font-style, normal);
          color: var(--text-color);
          font-family: Roboto, serif;
        }
        
        ::slotted(p) {
          margin-bottom: 0 !important;
        }
        
      </style>
      <div class="container">
        <img class="icon" src="/assets/icon/${this._icon}.svg"/>
        <div class="text">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

window.customElements.define('text-with-icon-webcomponent', TextWithIconWebComponent);
