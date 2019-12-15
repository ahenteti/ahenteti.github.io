/* eslint-disable no-undef */
import * as hljs from "common/vendor/highlight/highlight.min.js";

class AppArticle extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this._commonCss = window.webpackManifest["common.css"];
    this._commonJs = window.webpackManifest["common.js"];
  }

  connectedCallback() {
    this._title = this.getAttribute("article-title");
    this._root.innerHTML = /* html */ `
      <style>
        @import "${this._commonCss}";

        .container {
          background: white;
          width: 70%;
          padding: 8rem;
          border-radius: .4rem;
          margin: calc(var(--header-height) + 4rem) auto 4rem;
          box-shadow: var(--box-shadow);
        }
        
        h2 {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: .3rem solid var(--color-gray-eee);
        }

        .related-articles {
          --app-article-card-padding: 2rem;
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
            margin: calc(var(--header-height) + 3rem) auto 3rem;
          }
        }

        @media screen and (max-width: 720px) {
          .container {
            width: 100%;
            padding: 4rem;
            border-radius: 0;
            margin: var(--header-height) auto 0;
          }

          .related-articles {
            grid-template-columns: 1fr;
          }
        }

      </style>
      <div class="container">
        <app-article-title article-title="${this._title}"></app-article-title>
        <slot></slot>
        <h2 class="related-articles-title">Related articles</h2>
        <div class="related-articles">
        </div>
      </div>
    `;
    // //////////////////////////////// //
    //        global variables          //
    // //////////////////////////////// //
    const $appMultilineCode = document.querySelectorAll("app-multiline-code");
    const $appOnelineCode = document.querySelectorAll("app-oneline-code");
    const $articleComponent = document.querySelector("app-article");
    const $articleTitleComponent = $articleComponent.shadowRoot.querySelector(
      "app-article-title"
    );
    const $articleTitle = $articleTitleComponent.shadowRoot.querySelector("h1");
    const $articlePublicationDate = $articleTitleComponent.shadowRoot.querySelector(
      ".publication-date"
    );
    const $articleTagsContainer = $articleTitleComponent.shadowRoot.querySelector(
      ".tags"
    );
    const $relatedArticlesContainer = $articleComponent.shadowRoot.querySelector(
      ".related-articles"
    );
    const $relatedArticlesTitle = $articleComponent.shadowRoot.querySelector(
      ".related-articles-title"
    );

    // //////////////////////////////// //
    //          main actions            //
    // //////////////////////////////// //
    highlightCodeSectionsAsync();
    renderArticleMetadata();
    renderRelatedArticles();

    // ////////////////////////////// //
    //        event listeners         //
    // ////////////////////////////// //
    document.addEventListener("click", handleTagClickEvent);

    // //////////////////////////////// //
    //         util functions           //
    // //////////////////////////////// //
    function highlightCodeSectionsAsync() {
      setTimeout(() => {
        $appMultilineCode.forEach(el => {
          const code = el.querySelector("code");
          highlightBlock(code, el.language);
        });
        $appOnelineCode.forEach(el => {
          const code = el.shadowRoot.querySelector("code");
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
      if ($articleTitle.innerHTML == "null") {
        $articleTitle.innerHTML = currentArticleMetadata.name;
      }
      $articlePublicationDate.innerHTML =
        currentArticleMetadata.publicationDate;
      $articleTagsContainer.innerHTML = currentArticleMetadata.tags
        .split(",")
        .map(tag => `<app-tag value="${tag}"></app-tag>`)
        .join("");
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
      if (currentArticleMetadata.relatedArticles.length == 0) {
        $relatedArticlesTitle.setAttribute("hidden", "true");
      }
    }

    function handleTagClickEvent(event) {
      const tag = event.composedPath().find(component => {
        try {
          return component.classList.contains("tag");
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
        if (window.location.pathname.includes(article.url)) {
          return article;
        }
      }
      throw new Error(
        "the current article is not defined in the ALL_ARTICLES_BY_CATEGORY variable!"
      );
    }

    function renderArticle(article) {
      const markup = /* html */ `
      <app-article-card class="article related-article"
        url="${article.url}"
        name="${article.name}"
        publicationDate="${article.publicationDate}"
        tags="${article.tags}"
      ></app-article-card>
      `;
      $relatedArticlesContainer.insertAdjacentHTML("afterbegin", markup);
    }
  }
}

window.customElements.define("app-article", AppArticle);
