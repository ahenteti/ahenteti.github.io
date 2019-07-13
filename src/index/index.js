/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import './index.scss';

// ////////////////////////////// //
//        global variables        //
// ////////////////////////////// //
const $searchSection = document.querySelector('.search');
const $articles = document.querySelector('.articles');
const $noResult = document.querySelector('.no-result');
const $searchComponent = document.querySelector('app-search');
const $searchSelectedOption = $searchComponent.shadowRoot.querySelector('app-search-select').shadowRoot.querySelector('.select-selected').querySelector('span');
const $searchInputContainer = $searchComponent.shadowRoot.querySelector('app-search-input').shadowRoot.querySelector('.container');
const $searchInput = $searchComponent.shadowRoot.querySelector('app-search-input').shadowRoot.querySelector('input');

// ////////////////////////////// //
//         main actions           //
// ////////////////////////////// //
$searchSection.addEventListener('click', handleTagSelectionEvent);
$articles.addEventListener('click', handleTagSelectionEvent);
$searchInput.addEventListener('keyup', delay(handleSearchInputKeyupEvent, 500));
$searchInput.addEventListener('focus', handleSearchInputFocusEvent);
$searchInput.addEventListener('blur', handleSearchInputBlurEvent);
handleLocationSearchParam();

// ////////////////////////////// //
//        util functions          //
// ////////////////////////////// //
function handleTagSelectionEvent (event) {
  const tag = event.composedPath().find(component => {
    try {
      return component.classList.contains('tag');
    } catch (error) {
      return false;
    }
  });
  if (tag) {
    event.preventDefault();
    const tagValue = tag.innerText;
    $searchSelectedOption.innerHTML = tagValue;
    $searchSelectedOption.dispatchEvent(new Event('change'));
    renderArticles(findArticles());
    selectTags(tagValue);
  }
}

function handleSearchInputKeyupEvent () {
  const articles = findArticles();
  if (articles.length == 0) {
    renderNoResult($searchInput.value);
  } else {
    renderArticles(articles);
  }
}

function handleSearchInputFocusEvent () {
  $searchInputContainer.classList.add('focus');
}

function handleSearchInputBlurEvent () {
  $searchInputContainer.classList.remove('focus');
}

function selectTags (value) {
  document.querySelectorAll('.article').forEach(article => {
    article.shadowRoot.querySelectorAll('app-tag').forEach(tag => {
      if (tag.shadowRoot.querySelector('span').innerText == value) {
        tag.classList.add('selected');
      }
    });
  });
}

function findArticles () {
  const select = $searchSelectedOption.innerText;
  const input = $searchInput.value;

  const searchKeys = input.toLowerCase().split(' ');
  return Array.from(ALL_ARTICLES).filter(article => {
    const articleNameKeys = article.name.toLowerCase().split(' ');
    const articleTags = article.tags.toLowerCase().split(',');
    const articleKeys = articleNameKeys.concat(articleTags);
    var keep = false;
    searchKeys.forEach(key => {
      if (input != null && input != '') {
        if (select == 'all') {
          keep = article.searchKey.indexOf(key) > -1;
        } else {
          let keepBasedOnTagValue = false;
          article.tags.toLowerCase().split(',').forEach(tag => {
            if(tag == select) {
              keepBasedOnTagValue = true;
            }
          })
          keep = article.searchKey.indexOf(key) > -1 && keepBasedOnTagValue;
        }
      } else {
        if (select == 'all') {
          keep = true;
        } else {
          article.tags.toLowerCase().split(',').forEach(tag => {
            if(tag == select) {
              keep = true;
            }
          })
        }
      }
    })
    return keep;
  });
}

function delay (fn, ms) {
  let timer = 0;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(fn.bind(this, ...args), ms || 0);
  };
}

function renderAllArticles () {
  renderArticles(ALL_ARTICLES);
}

function renderArticles (articles) {
  resetArticles();
  resetNoResult();
  for (const article of articles) {
    renderArticle(article);
  }
}

function renderArticle (article) {
  const markup = /* html */`
  <app-article-card class="article"
    url="${article.url}"
    name="${article.name}"
    publicationDate="${article.publicationDate}"
    tags="${article.tags}"
  ></app-article-card>
  `;
  $articles.insertAdjacentHTML('afterbegin', markup);
}

function renderNoResult (value) {
  resetArticles();
  $noResult.innerHTML = `<span>Sorry, no results for "${value}"</span>`;
}

function resetNoResult () {
  $noResult.innerHTML = '';
}

function resetArticles () {
  $articles.innerHTML = '';
}

function handleLocationSearchParam () {
  const searchParam = new URLSearchParams(window.location.search);
  const tag = searchParam.get('tag');
  if (tag) {
    $searchSelectedOption.innerHTML = tag;
    $searchSelectedOption.dispatchEvent(new Event('change'));
    renderArticles(findArticles());
    selectTags(tag);
  } else {
    renderAllArticles();
  }
}
