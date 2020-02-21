import ElementWebComponent from '../element-webcomponent';

class ArticleSubTitleWebComponent extends ElementWebComponent {
  connectedCallback() {
    this._title = this.getAttribute('subtitle');
    this._root.innerHTML += /* html */ `
      <style>
        h2 {
          font-size: 3rem;
          font-weight: bold;
          line-height: 1.235;
          padding-top: 2rem;
          border-top: .3rem solid var(--border-color);
          padding-bottom: 1.6rem;
          margin: 0;
          color: var(--text-color);
        }
      </style>
      <h2>${this._title}</h2>
    `;
  }
}

window.customElements.define('article-subtitle-webcomponent', ArticleSubTitleWebComponent);
