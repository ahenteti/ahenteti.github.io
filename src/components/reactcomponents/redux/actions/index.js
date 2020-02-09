import * as actionTypes from './ActionTypes';
import * as commonConstants from 'common/constants';

export const changeThemeColor = () => ({
  type: actionTypes.CHANGE_THEME_COLOR,
  newTheme: window.localStorage.getItem(commonConstants.LOCAL_STORAGE_THEME_KEY)
});

export const changeWebsiteDivision = selectedWebsiteDivision => ({
  type: actionTypes.CHANGE_WEBSITE_DIVISION,
  newWebsiteDivision: selectedWebsiteDivision
});

export const selectTag = selectedTag => ({
  type: actionTypes.SELECT_TAG,
  selectedTag
});

export const onArticlesFilterChange = filter => ({
  type: actionTypes.ARTICLES_FILTER,
  filter
});
