import ElementWebComponent from '../element-webcomponent';

class RelatedArticleCardWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._slug = this.getAttribute('slug');
    this._name = this.getAttribute('name');
    this._publicationDate = this.getAttribute('publicationDate');
    this._tags = this.getAttribute('tags');

    this._root.innerHTML += /* html */ `
      <style>
        :host {
          --article-card-border-top-height: 1px;
          --article-card-border-right-height: 1px;
          --article-card-border-bottom-height: 1px;
          --article-card-border-left-height: 1px;
          --article-card-background-color: var(--related-article-card-background-color);
          --article-card-border-color: var(--related-article-border-color);
          --tag-background-color: var(--related-article-tag-background-color);
          --article-card-padding: 2rem;
        }
      </style>
      <article-card-webcomponent 
        slug="${this._slug}" 
        name="${this._name}" 
        publicationDate="${this._publicationDate}" 
        tags="${this._tags}" >
      </article-card-webcomponent>
    `;
  }
}

window.customElements.define('related-article-card-webcomponent', RelatedArticleCardWebComponent);
