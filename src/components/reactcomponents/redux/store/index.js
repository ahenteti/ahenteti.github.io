/* eslint-disable no-undef */
/* eslint-disable indent */
import * as actionTypes from 'components/reactcomponents/redux/constants/ActionTypes';
import * as themeConstants from 'components/reactcomponents/redux/constants/ThemeConstants';
import * as commonConstants from 'common/constants';
import { createStore } from 'redux';
import { findArticles } from '../utils/articles-utils';

const selectedTag = initSelectedTag();
const initialState = {
  theme: initTheme(),
  unknownChangeThemeColorFeature: initUnknownChangeThemeColorFeature(),
  articles: initArticles(selectedTag),
  tags: ALL_TAGS,
  selectedTag: selectedTag,
  articlesFilter: ''
};

export default createStore(reducer, initialState);

function initTheme() {
  const searchParam = new URLSearchParams(window.location.search);
  const themeInput =
    searchParam.get(commonConstants.THEME_QUERY_PARAM) || localStorage.getItem(commonConstants.LOCAL_STORAGE_THEME_KEY);
  let theme;
  if (themeConstants.LIGHT === themeInput) {
    theme = themeConstants.LIGHT;
  } else {
    theme = themeConstants.DARK;
  }
  return theme;
}

function initUnknownChangeThemeColorFeature() {
  if (localStorage.getItem(commonConstants.LOCAL_STORAGE_CHANGE_THEME_FEATURE) === null) {
    localStorage.setItem(commonConstants.LOCAL_STORAGE_CHANGE_THEME_FEATURE, '');
    return true;
  }
  return false;
}

function initSelectedTag() {
  const tagFromUrl = new URLSearchParams(window.location.search).get(commonConstants.TAG_QUERY_PARAM);
  if (tagFromUrl !== null) return tagFromUrl;
  return commonConstants.ALL_TAGS;
}

function initArticles(tag) {
  if (commonConstants.ALL_TAGS !== tag) {
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
      const newTheme = themeConstants.DARK === action.currentTheme ? themeConstants.LIGHT : themeConstants.DARK;
      return Object.assign({}, state, { theme: newTheme, unknownChangeThemeColorFeature: false });
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
