/* eslint-disable no-undef */
import ElementWebComponent from '../element-webcomponent';
import * as hljs from 'common/vendor/highlight/highlight.min.js';
import * as constants from '../../../common/constants';

class ArticleWebComponent extends ElementWebComponent {
  connectedCallback() {
    super.connectedCallback();
    this._title = this.getAttribute('article-title');
    this._root.innerHTML += /* html */ `
      <style>

        .container {
          color: var(--text-color);
        }

        h2 {
          margin-top: 3rem;
          margin-bottom: 0.8rem;
          padding-bottom: 0.8rem;
          font-weight: bold;
          font-size: 2rem;
        }

        h2::first-letter {
          text-transform: uppercase;
        }

        ul li {
          line-height: 2rem;
          list-style-type: none;
          list-style-position: inside;
          padding-left: 1.5rem;
        }

        ul li::before {
          content: '■';
          padding-right: 1rem;
        }

        h3 {
          font-size: 1.6rem;
          padding-bottom: 1rem;
          margin-top: 2rem;
        }

        .steps {
          counter-reset: steps;
        }

        h3.step::before {
          counter-increment: steps 1;
          content: counter(steps) '.';
          font-size: 3rem;
          color: var(--primary-color);
          padding-right: 1rem;
        }

        .container {
          background: var(--article-background-color);
          max-width: var(--max-width);
          width: 70%;
          padding: 8rem;
          padding-bottom: 0;
          border-top-left-radius: .4rem;
          border-top-right-radius: .4rem;
          margin: calc(var(--header-height) + 4rem) auto 0;
          box-shadow: var(--box-shadow);
        }
        
        h2 {
          margin: 3rem 0 1.6rem;
          font-size: 3rem;
          font-weight: bold;
          line-height: 1.235;
        }

        .related-articles {
          margin-top: 2rem;
          display: grid;
          min-width: 0;
          grid-gap: 2rem;
          grid-template-columns: 1fr 1fr;
        }

        .related-articles .article {
          min-width: 0;
        }

        @media screen and (min-width: 720px) and (max-width: 1200px) {
          .container {
            width: 80%;
            padding: 6rem;
            padding-bottom: 0;
            margin: calc(var(--header-height) + 3rem) auto 0;
          }
        }

        @media screen and (max-width: 720px) {
          .container {
            width: 100%;
            padding: 4rem;
            padding-bottom: 0;
            border-radius: 0;
            margin: var(--header-height) auto 0;
          }

          .related-articles {
            grid-template-columns: 1fr;
          }
        }

      </style>

      <div class="container">
        <article-title-webcomponent article-title="${this._title}"></article-title-webcomponent>
        <slot></slot>
        <h2 class="related-articles-title">Related articles</h2>
        <div class="related-articles"></div>
      </div>
    `;
    // //////////////////////////////// //
    //        global variables          //
    // //////////////////////////////// //
    const $appMultilineCode = document.querySelectorAll('multiline-code-webcomponent');
    const $appOnelineCode = document.querySelectorAll('oneline-code-webcomponent');
    const $articleComponent = document.querySelector('article-webcomponent');
    const $articleTitleComponent = $articleComponent.shadowRoot.querySelector('article-title-webcomponent');
    const $articleTitle = $articleTitleComponent.shadowRoot.querySelector('h1');
    const $articlePublicationDate = $articleTitleComponent.shadowRoot.querySelector('.publication-date');
    const $articleTagsContainer = $articleTitleComponent.shadowRoot.querySelector('.tags');
    const $relatedArticlesContainer = $articleComponent.shadowRoot.querySelector('.related-articles');
    const $relatedArticlesTitle = $articleComponent.shadowRoot.querySelector('.related-articles-title');

    // main actions
    highlightCodeSectionsAsync();
    renderArticleMetadata();
    renderRelatedArticles();
    renderArticleCommentsContainer();

    // event listeners
    document.addEventListener('click', handleTagClickEvent);

    // util functions
    function highlightCodeSectionsAsync() {
      setTimeout(() => {
        $appMultilineCode.forEach(el => {
          const code = el.querySelector('code');
          highlightBlock(code, el.language);
        });
        $appOnelineCode.forEach(el => {
          const code = el.shadowRoot.querySelector('code');
          highlightBlock(code, el.language);
        });
      });
    }

    function highlightBlock(code, language) {
      if (language) {
        code.classList.add(language);
      }
      hljs.highlightBlock(code);
    }

    function renderArticleMetadata() {
      const currentArticleMetadata = findArticleMetadata();
      if ($articleTitle.innerHTML == 'null') {
        $articleTitle.innerHTML = currentArticleMetadata.name;
      }
      $articlePublicationDate.innerHTML = currentArticleMetadata.publicationDate;
      $articleTagsContainer.innerHTML = currentArticleMetadata.tags
        .split(',')
        .map(tag => `<tag-webcomponent value="${tag}"></tag-webcomponent>`)
        .join('');
    }

    function renderRelatedArticles() {
      const currentArticleMetadata = findArticleMetadata();
      var index = 0;
      for (const article of currentArticleMetadata.relatedArticles) {
        renderArticle(article);
        index++;
        if (index >= 2) {
          break;
        }
      }
      if (currentArticleMetadata.relatedArticles.length === 0) {
        $relatedArticlesTitle.setAttribute('hidden', 'true');
      }
    }

    function renderArticleCommentsContainer() {
      $articleComponent.insertAdjacentHTML('afterend', '<div class="article-comments"></div>');
    }

    function handleTagClickEvent(event) {
      const tag = event.composedPath().find(component => {
        try {
          return component.classList.contains('tag');
        } catch (error) {
          return false;
        }
      });
      if (tag) {
        event.preventDefault();
        window.location = `/index.html?tag=${tag.innerText}`;
      }
    }

    function findArticleMetadata() {
      for (const article of ALL_ARTICLES) {
        if (window.location.pathname.includes(article.slug)) {
          return article;
        }
      }
      throw new Error('the current article is not defined in the ALL_ARTICLES_BY_CATEGORY variable!');
    }

    function renderArticle(article) {
      const markup = /* html */ `
      <related-article-card-webcomponent class="article related-article"
        slug="${article.slug}"
        name="${article.name}"
        publicationDate="${article.publicationDate}"
        tags="${article.tags}"
      ></related-article-card-webcomponent>
      `;
      $relatedArticlesContainer.insertAdjacentHTML('afterbegin', markup);
    }
  }
}

window.customElements.define('article-webcomponent', ArticleWebComponent);
