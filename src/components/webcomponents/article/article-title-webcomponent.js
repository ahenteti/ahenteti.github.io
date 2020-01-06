import ElementWebComponent from '../element-webcomponent';

class ArticleTitleWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._title = this.getAttribute('article-title');
    this._root.innerHTML += /* html */ `
      <style>
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

        [data-tooltip].tooltip-top::before {
            content: attr(data-tooltip);
            position: absolute;
            background-color: var(--tooltip-background-color);
            color: var(--tooltip-color);
            padding: 0.8rem 1.6rem;
            border-radius: 0.3rem;
            white-space: nowrap;
            font-size: 1.4rem;

            bottom: calc(100% + var(--tooltip-margin) + var(--tooltip-triangle-height));
            left: 50%;
            transform: translateX(-50%);
        }

        [data-tooltip].tooltip-top::after {
            content: '';
            position: absolute;
            border-top: var(--tooltip-triangle-height) solid var(--tooltip-background-color);
            border-right: var(--tooltip-triangle-height) solid transparent;
            border-bottom: none;
            border-left: var(--tooltip-triangle-height) solid transparent;

            bottom: calc(100% + var(--tooltip-margin));
            left: 50%;
            transform: translateX(-50%);
        }

        [data-tooltip].tooltip-right::before {
            content: attr(data-tooltip);
            position: absolute;
            background-color: var(--tooltip-background-color);
            color: var(--tooltip-color);
            padding: 0.8rem 1.6rem;
            border-radius: 0.3rem;
            white-space: nowrap;
            font-size: 1.4rem;

            top: 50%;
            left: calc(100% + var(--tooltip-margin) + var(--tooltip-triangle-height));
            transform: translateY(-50%);
        }

        [data-tooltip].tooltip-right::after {
            content: '';
            position: absolute;
            border-top: var(--tooltip-triangle-height) solid transparent;
            border-right: var(--tooltip-triangle-height) solid var(--tooltip-background-color);
            border-bottom: var(--tooltip-triangle-height) solid transparent;
            border-left: none;

            top: 50%;
            left: calc(100% + var(--tooltip-margin));
            transform: translateY(-50%);
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

        [data-tooltip].tooltip-left::before {
            content: attr(data-tooltip);
            position: absolute;
            background-color: var(--tooltip-background-color);
            color: var(--tooltip-color);
            padding: 0.8rem 1.6rem;
            border-radius: 0.3rem;
            white-space: nowrap;
            font-size: 1.4rem;

            top: 50%;
            right: calc(100% + var(--tooltip-margin) + var(--tooltip-triangle-height));
            transform: translateY(-50%);
        }

        [data-tooltip].tooltip-left::after {
            content: '';
            position: absolute;
            border-top: var(--tooltip-triangle-height) solid transparent;
            border-right: none;
            border-bottom: var(--tooltip-triangle-height) solid transparent;
            border-left: var(--tooltip-triangle-height) solid var(--tooltip-background-color);

            top: 50%;
            right: calc(100% + var(--tooltip-margin));
            transform: translateY(-50%);
        }

        .container {
          padding-bottom: 3rem;
          margin-bottom: 3rem;
          border-bottom: .3rem solid var(--border-color);
        }

        h1 {
          color: var(--title-color);
          line-height: 1;
          font-weight: 100;
          font-size: 6.5rem;
        }
        
        h1::first-line  {
          font-weight: 400;
        }

        .metadata {
          margin-top: 5rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }

        .publication-date {
          font-size: 1.5rem;
          font-weight: 300;
        }

        .tags:hover {
          cursor: pointer;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -.5rem;
        }

        .tags tag-webcomponent {
          margin: .3rem .5rem;
        }

        @media screen and (max-width: 460px) {
          h1 {
            font-size: 5rem;
          }

          .metadata {
            margin-top: 3rem; 
            display: block;
          }

          .publication-date {
            margin-top:3rem;
          }
        }

      </style>
      <div class="container">
        <h1>${this._title}</h1>
        <div class="metadata">
          <div class="tags">
          </div>
          <div data-tooltip="publication date" class="tooltip-top publication-date">
          </div>
        </div>
      </div>
      `;
  }
}

window.customElements.define('article-title-webcomponent', ArticleTitleWebComponent);
