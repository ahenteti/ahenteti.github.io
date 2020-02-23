/* eslint-disable no-undef */
/* eslint-disable indent */
import * as actionTypes from './action.types';
import * as constants from 'common/constants';
import { createStore } from 'redux';

const selectedTag = initSelectedTag();
const initialState = {
  articles: initArticles(selectedTag),
  tags: initTags(),
  selectedTag: selectedTag,
  articlesFilter: '',
  currentWebsiteDivision: initCurrentWebsiteDivision(),
  websiteDivisions: constants.WEBSITE_DIVISIONS,
  tools: ALL_TOOLS
};

function reducer(state = initialState, action) {
  let displayedArticles;
  let selectedTag;
  let articlesFilter;
  switch (action.type) {
    case actionTypes.CHANGE_WEBSITE_DIVISION:
      const newWebsiteDivision = action.newWebsiteDivision;
      localStorage.setItem(constants.CURRENT_WEBSITE_DIVISION_LOCAL_STORAGE_KET, newWebsiteDivision);
      return Object.assign({}, state, { currentWebsiteDivision: newWebsiteDivision });
    case actionTypes.SELECT_TAG:
      selectedTag = action.selectedTag;
      articlesFilter = state.articlesFilter;
      displayedArticles = findArticles(selectedTag, articlesFilter);
      return Object.assign({}, state, { selectedTag: selectedTag, articles: displayedArticles });
    case actionTypes.ARTICLES_FILTER:
      selectedTag = state.selectedTag;
      articlesFilter = action.filter;
      displayedArticles = findArticles(state.selectedTag, articlesFilter);
      return Object.assign({}, state, { articles: displayedArticles, articlesFilter: articlesFilter });
    default:
      return state;
  }
}

export default createStore(reducer, initialState);

function initTags() {
  return [constants.ALL_ARTICLES, constants.NEW_ARTICLES, ...ARTICLES_TAGS];
}

function initCurrentWebsiteDivision() {
  if (localStorage.getItem(constants.CURRENT_WEBSITE_DIVISION_LOCAL_STORAGE_KET) !== null) {
    return localStorage.getItem(constants.CURRENT_WEBSITE_DIVISION_LOCAL_STORAGE_KET);
  }
  return constants.DEFAULT_WEBSITE_DIVISION;
}

function initSelectedTag() {
  const tagFromUrl = new URLSearchParams(window.location.search).get(constants.TAG_QUERY_PARAM);
  if (tagFromUrl !== null) return tagFromUrl;
  return constants.ALL_ARTICLES;
}

function initArticles(tag) {
  if (constants.ALL_ARTICLES !== tag) {
    return findArticles(tag);
  } else {
    return ALL_ARTICLES_BY_CATEGORY;
  }
}

function findArticles(selectedTag = constants.ALL_ARTICLES, articlesFilter = '') {
  const searchKeys = articlesFilter.toLowerCase().split(' ');
  const articles = Array.from(ALL_ARTICLES).filter(article => {
    var keep = false;
    searchKeys.forEach(key => {
      if (articlesFilter != null && articlesFilter !== '') {
        if (selectedTag === constants.ALL_ARTICLES) {
          keep = article.searchKey.indexOf(key) > -1;
        } else if (selectedTag === constants.NEW_ARTICLES) {
          keep = article.recent;
        } else {
          let keepBasedOnTagValue = false;
          article.tags
            .toLowerCase()
            .split(',')
            .forEach(tag => {
              if (tag === selectedTag) {
                keepBasedOnTagValue = true;
              }
            });
          keep = article.searchKey.indexOf(key) > -1 && keepBasedOnTagValue;
        }
      } else {
        if (selectedTag === constants.ALL_ARTICLES) {
          keep = true;
        } else if (selectedTag === constants.NEW_ARTICLES) {
          keep = article.recent;
        } else {
          article.tags
            .toLowerCase()
            .split(',')
            .forEach(tag => {
              if (tag === selectedTag) {
                keep = true;
              }
            });
        }
      }
    });
    return keep;
  });

  const articlesByCategory = {};
  for (const article of articles) {
    if (!articlesByCategory.hasOwnProperty(article.category)) {
      articlesByCategory[article.category] = [];
    }
    articlesByCategory[article.category].push(article);
  }
  const sortable = [];
  for (const category in articlesByCategory) {
    sortable.push([category, articlesByCategory[category]]);
  }
  sortable.sort(function(a, b) {
    return b[1].length - a[1].length;
  });

  const sortedArticlesByCategory = {};
  sortable.forEach(function(item) {
    sortedArticlesByCategory[item[0]] = item[1];
  });
  return sortedArticlesByCategory;
}
