/* eslint-disable no-undef */
import ElementWebComponent from '../element-webcomponent';
import * as hljs from 'common/vendor/highlight/highlight.min.js';
import * as constants from '../../../common/constants';

class ArticleWebComponent extends ElementWebComponent {
  calcThemeThemeRelatedArticlesStyles() {
    const lightTheme = window.localStorage
      .getItem(constants.LOCAL_STORAGE_THEME_KEY)
      .includes(constants.LOCAL_STORAGE_THEME_LIGHT);
    if (lightTheme) {
      return /* html */ `
        <style>
          .related-articles {
            --article-card-background-color: #fcfcfc;
            --border-color: #eee;
            --tag-background-color: #f2f2f2;
          }
        </style>
      `;
    } else {
      return '';
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._title = this.getAttribute('article-title');
    this._darkThemeRelatedArticlesStyles = this.calcThemeThemeRelatedArticlesStyles();
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
          width: 70%;
          padding: 8rem;
          padding-bottom: 0;
          border-top-left-radius: .4rem;
          border-top-right-radius: .4rem;
          margin: calc(var(--header-height) + 4rem) auto 0;
          box-shadow: var(--box-shadow);
        }
        
        h2 {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: .3rem solid var(--border-color);
        }

        .related-articles {
          --article-card-padding: 2rem;
          --article-card-background-color: var(--code-background-color);
          --border-color: var(--code-background-color);
          --tag-background-color: #394048;
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

      ${this._darkThemeRelatedArticlesStyles}

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
      <article-card-webcomponent class="article related-article"
        slug="${article.slug}"
        name="${article.name}"
        publicationDate="${article.publicationDate}"
        tags="${article.tags}"
      ></article-card-webcomponent>
      `;
      $relatedArticlesContainer.insertAdjacentHTML('afterbegin', markup);
    }
  }
}

window.customElements.define('article-webcomponent', ArticleWebComponent);
