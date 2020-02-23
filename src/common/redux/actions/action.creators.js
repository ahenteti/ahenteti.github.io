import * as actionTypes from './action.types';
import * as commonConstants from 'common/constants';

export const changeThemeColor = () => ({
  type: actionTypes.CHANGE_THEME_COLOR,
  newTheme: window.localStorage.getItem(commonConstants.LOCAL_STORAGE_THEME_KEY)
});
