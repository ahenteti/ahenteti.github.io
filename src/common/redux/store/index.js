/* eslint-disable no-undef */
/* eslint-disable indent */
import * as actionTypes from 'common/redux/actions/ActionTypes';
import * as constants from 'common/constants';
import { createStore } from 'redux';
import { findArticles } from '../utils/articles-utils';

const selectedTag = initSelectedTag();
const initialState = {
  theme: initTheme(),
  unknownChangeThemeColorFeature: initUnknownChangeThemeColorFeature(),
  articles: initArticles(selectedTag),
  tags: initTags(),
  selectedTag: selectedTag,
  articlesFilter: '',
  currentWebsiteDivision: initCurrentWebsiteDivision(),
  websiteDivisions: constants.WEBSITE_DIVISIONS,
  tools: ALL_TOOLS
};

export default createStore(reducer, initialState);

function initTags() {
  return [constants.ALL_ARTICLES, constants.NEW_ARTICLES, ...ARTICLES_TAGS];
}

function initTheme() {
  const searchParam = new URLSearchParams(window.location.search);
  const themeInput =
    searchParam.get(constants.THEME_QUERY_PARAM) || localStorage.getItem(constants.LOCAL_STORAGE_THEME_KEY);
  let theme;
  if (constants.LIGHT_THEME === themeInput) {
    theme = constants.LIGHT_THEME;
  } else {
    theme = constants.DARK_THEME;
  }
  return theme;
}

function initCurrentWebsiteDivision() {
  if (localStorage.getItem(constants.CURRENT_WEBSITE_DIVISION_LOCAL_STORAGE_KET) !== null) {
    return localStorage.getItem(constants.CURRENT_WEBSITE_DIVISION_LOCAL_STORAGE_KET);
  }
  return constants.DEFAULT_WEBSITE_DIVISION;
}

function initUnknownChangeThemeColorFeature() {
  if (localStorage.getItem(constants.LOCAL_STORAGE_CHANGE_THEME_FEATURE) === null) {
    localStorage.setItem(constants.LOCAL_STORAGE_CHANGE_THEME_FEATURE, '');
    return true;
  }
  return false;
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

function reducer(state = initialState, action) {
  let displayedArticles;
  let selectedTag;
  let articlesFilter;
  switch (action.type) {
    case actionTypes.CHANGE_THEME_COLOR:
      const newTheme = constants.DARK_THEME === action.newTheme ? constants.LIGHT_THEME : constants.DARK_THEME;
      return Object.assign({}, state, { theme: newTheme, unknownChangeThemeColorFeature: false });
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
