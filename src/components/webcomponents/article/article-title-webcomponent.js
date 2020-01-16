import ElementWebComponent from '../element-webcomponent';

class ArticleTitleWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._title = this.getAttribute('article-title');
    this._root.innerHTML += /* html */ `
      <style>
        .container {
          padding-bottom: 3rem;
          margin-bottom: 3rem;
          border-bottom: .3rem solid var(--border-color);
        }

        h1 {
          color: var(--title-color);
          line-height: 1;
          font-weight: 100;
          font-size: 8.5rem;
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
