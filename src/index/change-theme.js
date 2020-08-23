import * as constants from 'common/constants.js';

const changeThemeToLightIcon = document.querySelector('.change-theme-to-light-icon');
const changeThemeToDarkIcon = document.querySelector('.change-theme-to-dark-icon');
toggleIcons(window.localStorage.getItem(constants.LOCAL_STORAGE_THEME_KEY));
changeThemeToLightIcon.addEventListener('click', () => changeTheme(constants.LIGHT_THEME));
changeThemeToDarkIcon.addEventListener('click', () => changeTheme(constants.DARK_THEME));

function changeTheme(newTheme) {
  console.log(newTheme);
  window.localStorage.setItem(constants.LOCAL_STORAGE_THEME_KEY, newTheme);
  document.querySelector('body').className = newTheme;
  toggleIcons(newTheme);
}

function toggleIcons(currentTheme) {
  changeThemeToDarkIcon.style.visibility = 'visible';
  changeThemeToLightIcon.style.visibility = 'visible';
  if (currentTheme === constants.DARK_THEME) {
    changeThemeToDarkIcon.style.visibility = 'hidden';
  } else {
    changeThemeToLightIcon.style.visibility = 'hidden';
  }
}
