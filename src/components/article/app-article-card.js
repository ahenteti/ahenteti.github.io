class AppArticleCard extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._commonCss = window.webpackManifest['common.css'];
    }

    connectedCallback() {
        this._url = this.getAttribute('url');
        this._name = this.getAttribute('name');
        this._publicationDate = this.getAttribute('publicationDate');
        this._tags = this.getAttribute('tags').split(',');
        this._relatedArticle = this.getAttribute('related-article') || false;

        this._root.innerHTML = /* html */ `
      <style>
        @import "${this._commonCss}";

        .container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: var(--app-article-card-padding, 3rem);
          background-color: var(--article-card-background-color);
          position: relative;
          transition: box-shadow .2s;
          transition: all .2s ease-in;
          border-bottom: 3px solid var(--border-color);
        }

        .container:hover {
          border-bottom: 3px solid var(--primary-color-light) !important;
        }

        .container:hover .name {
          color: var(--primary-color);
        }
        
        .name {
          color: var(--title-color);
          padding-bottom: 1.5rem;
          font-weight: bold;
          font-size: 2rem;
          flex-grow: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color .2s ease-in;
        }

        .publication-date {
          display: flex;
          flex-wrap: wrap;
          color: var(--text-color-light);
        }
        
        .publication-date p {
          font-size: 1.3rem;
        }

        ion-icon {
          margin-right: 1rem;
          transition: color .2s ease-in;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          color: var(--text-color-light);
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .tags app-tag {
          margin: .3rem .5rem;
        }

        .tags ion-icon {
          margin-right: calc(1rem - .3rem);
        }

      </style>
      <a href="${this._url}">
        <div class="container">
          <p class="name">${this._name}</p>
          <div class="tags">
            <ion-icon name="ios-pricetags"></ion-icon>
            ${this._tags.map(tag => `<app-tag value="${tag}"></app-tag>`).join('')}
          </div>
          <div class="publication-date">
            <ion-icon name="calendar"></ion-icon>
            <p>${this._publicationDate}</p>
          </div>
        </div>
      </a>
    `;
        this._container = this._root.querySelector('.container');

        this.alreadyVisible = function() {
            let position = this.getBoundingClientRect();
            return position.top < 0 || (position.top < window.innerHeight && position.bottom >= 0);
        };

        this.addAlreadyVisibleClass = function() {
            this._container.classList.add('already-visible');
        };

        this.addNotYetVisibleClass = function() {
            this._container.classList.add('not-yet-visible');
        };

        this.addComeInClass = function() {
            this._container.classList.add('come-in');
        };
    }
}

window.customElements.define('app-article-card', AppArticleCard);

setTimeout(() => {
    document.querySelectorAll('app-article-card').forEach(card => {
        if (card.alreadyVisible()) {
            card.addAlreadyVisibleClass();
        } else {
            card.addNotYetVisibleClass();
        }
    });
    window.addEventListener('scroll', function() {
        document.querySelectorAll('app-article-card').forEach(card => {
            if (card.alreadyVisible()) {
                card.addComeInClass();
            }
        });
    });
});
