import * as constants from '../constants/ActionTypes';

export const changeThemeColor = currentTheme => ({
  type: constants.CHANGE_THEME_COLOR,
  currentTheme: currentTheme
});
