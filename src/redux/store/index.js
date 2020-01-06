/* eslint-disable indent */
import * as actionTypes from 'redux/constants/ActionTypes';
import * as themeConstants from 'redux/constants/ThemeConstants';
import * as commonConstants from 'common/constants';
import { createStore } from 'redux';

const initialState = {
  theme: findTheme()
};

export default createStore(reducer, initialState);

function findTheme() {
  const searchParam = new URLSearchParams(window.location.search);
  const themeInput = searchParam.get('theme') || localStorage.getItem(commonConstants.LOCAL_STORAGE_THEME_KEY);
  let theme;
  if (themeConstants.LIGHT === themeInput) {
    theme = themeConstants.LIGHT;
  } else {
    theme = themeConstants.DARK;
  }
  return theme;
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_THEME_COLOR:
      const newTheme = themeConstants.DARK === action.currentTheme ? themeConstants.LIGHT : themeConstants.DARK;
      return Object.assign({}, state, { theme: newTheme });
    default:
      return state;
  }
}
