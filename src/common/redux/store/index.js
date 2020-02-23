/* eslint-disable no-undef */
/* eslint-disable indent */
import * as actionTypes from 'common/redux/actions/action.types';
import * as constants from 'common/constants';
import { createStore } from 'redux';

const initialState = {
  theme: initTheme(),
  unknownChangeThemeColorFeature: initUnknownChangeThemeColorFeature()
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_THEME_COLOR:
      const newTheme = constants.DARK_THEME === action.newTheme ? constants.LIGHT_THEME : constants.DARK_THEME;
      return Object.assign({}, state, { theme: newTheme, unknownChangeThemeColorFeature: false });
    default:
      return state;
  }
}

export default createStore(reducer, initialState);

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

function initUnknownChangeThemeColorFeature() {
  if (localStorage.getItem(constants.LOCAL_STORAGE_CHANGE_THEME_FEATURE) === null) {
    localStorage.setItem(constants.LOCAL_STORAGE_CHANGE_THEME_FEATURE, '');
    return true;
  }
  return false;
}
