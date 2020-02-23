import * as actionTypes from './action.types';

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
