import * as actionTypes from '../constants/ActionTypes';
import * as commonConstants from 'common/constants';

export const changeThemeColor = () => ({
  type: actionTypes.CHANGE_THEME_COLOR,
  currentTheme: window.localStorage.getItem(commonConstants.LOCAL_STORAGE_THEME_KEY)
});

export const selectTag = selectedTag => ({
  type: actionTypes.SELECT_TAG,
  selectedTag
});

export const onArticlesFilterChange = filter => ({
  type: actionTypes.ARTICLES_FILTER,
  filter
});
