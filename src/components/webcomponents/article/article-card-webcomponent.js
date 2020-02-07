import ElementWebComponent from '../element-webcomponent';

class ArticleCardWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._slug = this.getAttribute('slug');
    this._name = this.getAttribute('name');
    this._publicationDate = this.getAttribute('publicationDate');
    this._tags = this.getAttribute('tags').split(',');

    this._root.innerHTML += /* html */ `
      <style>

        .container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: var(--article-card-padding, 3rem);
          background-color: var(--article-card-background-color);
          position: relative;
          transition: box-shadow .2s;
          transition: all .2s ease-in;
          border-top: var(--article-card-border-top-height) solid var(--article-card-border-color);
          border-right: var(--article-card-border-right-height) solid var(--article-card-border-color);
          border-bottom: var(--article-card-border-bottom-height) solid var(--article-card-border-color);
          border-left: var(--article-card-border-left-height) solid var(--article-card-border-color);
          border-radius: var(--article-card-border-radius);
        }

        a {
          text-decoration: none;
          transition: color 0.2s ease-in;
        }

        .container:hover {
          border-color: var(--primary-color);
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
          font-size: 1.5rem;
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
        
        .tags tag-webcomponent {
          margin: .3rem .5rem;
        }

        .tags ion-icon {
          margin-right: calc(1rem - .3rem);
        }

        .slide-in {
          animation: slide-in 0.8s ease forwards;
        }

        .already-visible {
          transform: translateY(0);
          animation: none;
        }

        .not-yet-visible {
          transform: translateY(var(--slide-in-translate-y));
        }

        @keyframes slide-in {
          to {
            transform: translateY(0);
          }
        }


      </style>
      <a href="${this._slug}">
        <div class="container">
          <p class="name">${this._name}</p>
          <div class="tags">
            <ion-icon name="ios-pricetags"></ion-icon>
            ${this._tags.map(tag => `<tag-webcomponent value="${tag}"></tag-webcomponent>`).join('')}
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
      const position = this.getBoundingClientRect();
      return position.top < 0 || (position.top < window.innerHeight - 50 && position.bottom >= 0);
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

window.customElements.define('article-card-webcomponent', ArticleCardWebComponent);
