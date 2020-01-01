class AppTextWithIcon extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this._commonCss = window.webpackManifest["common.css"];
  }

  connectedCallback() {
    this._icon = this.getAttribute("icon");
    this._root.innerHTML = /* html */ `
    <style>
        @import "${this._commonCss}";

        .container {
          margin: 1rem 0 0;
          display: flex;
          flex-wrap: wrap;
        }

        .icon {
          background: var(--icon-background-color);
          flex: 0 0 var(--container-prefix-width);
          position: relative;
          border-radius: var(--left-border-radius);
        }

        ion-icon {
          color: var(--icon-color);
          font-size: 3rem;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: 700;
        }

        .text {
          flex: 1;
          background: var(--text-background-color);
          font-style: var(--text-font-style, normal);
          color: var(--text-color);
          padding: 2rem;
          font-family: Roboto, serif;
          border-radius: var(--right-border-radius);
        }
        
      </style>
      <div class="container">
        <div class="icon">
          <ion-icon name="${this._icon}"></ion-icon>
        </div>
        <div class="text">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

window.customElements.define("app-text-with-icon", AppTextWithIcon);
