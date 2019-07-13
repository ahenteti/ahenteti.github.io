class AppArticleInSerie extends HTMLElement {
  constructor () {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._commonCss = window.webpackManifest['common.css'];
  }

  connectedCallback () {
    this._prevArticle = this.getAttribute('prev-article') || 'previous article';
    this._prevArticleLink = this.getAttribute('prev-article-link')
    this._nextArticle = this.getAttribute('next-article') || 'next article';
    this._nextArticleLink = this.getAttribute('next-article-link')
    this._title = this.getAttribute('article-title');
    this._root.innerHTML = /* html */`
      <style>
        @import "${this._commonCss}";
        .prev-article, .next-article {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.2;
          transition: var(--transition);
        }

        .prev-article:hover, .next-article:hover {
          opacity: 1;
        }
        
        .prev-article {
          left: 0;
        }

        .next-article {
          right: 0;
        }
        
        .prev-article ion-icon, .next-article ion-icon {
          font-size: 6rem;
          color: var(--color-gray-light);
        }

        .tooltip-container {
          z-index: 9999;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }

        .tooltip-container div {
          height: 100%;
          width: 100%;
        }
        
      </style>
      <app-article article-title="${this._title}">
        <slot></slot>
      </app-article>
      <a class="prev-article" href="${this._prevArticleLink}">
        <div class="tooltip-container">
          <div class="tooltip-right" data-tooltip="${this._prevArticle}"></div>
        </div>
        <ion-icon name="ios-arrow-back"></ion-icon>
        </a>
      <a class="next-article" href="${this._nextArticleLink}">
        <div class="tooltip-container">
          <div class="tooltip-left" data-tooltip="${this._nextArticle}"></div>
        </div>
        <ion-icon name="ios-arrow-forward"></ion-icon>
      </a>
    `;

    const $appArticleInSerie = document.querySelector('app-article-in-serie');
    const $prevArticle = $appArticleInSerie.shadowRoot.querySelector('.prev-article');
    const $nextArticle = $appArticleInSerie.shadowRoot.querySelector('.next-article');

  }
}

window.customElements.define('app-article-in-serie', AppArticleInSerie);
