import './article.scss';
import './article.js';
import './comments.scss';
import './common.scss';
import * as commonConstants from 'common/constants.js';
import * as themeConstants from 'redux/constants/ThemeConstants';
import './constants.scss';
import './slide-in.scss';
import './table.scss';
import './tooltip.scss';
import './vendor/font.css';
import store from 'redux/store';

// main actions
const $oneLineTexts = document.querySelectorAll('.one-line');
updateBodyCssClass();
store.subscribe(updateBodyCssClass);
$oneLineTexts.forEach(resizeTextFontSize);

// functions
function updateBodyCssClass() {
  const theme = store.getState().theme;
  const $body = document.querySelector('body');
  $body.className = theme;
  localStorage.setItem(commonConstants.LOCAL_STORAGE_THEME_KEY, theme);
}

function resizeTextFontSize(text) {
  let fontSize = parseInt(window.getComputedStyle(text).fontSize);
  for (let i = fontSize; i >= 0; i--) {
    if (isOverflown(text)) {
      fontSize--;
      text.style.fontSize = fontSize + 'px';
    }
  }
}

function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function findTheme() {
  const searchParam = new URLSearchParams(window.location.search);
  const themeInput = searchParam.get('theme') || localStorage.getItem(commonConstants.LOCAL_STORAGE_THEME_KEY);
  let theme;
  if (themeConstants.DARK === themeInput) {
    theme = themeConstants.DARK;
  } else {
    theme = themeConstants.LIGHT;
  }
  localStorage.setItem(commonConstants.LOCAL_STORAGE_THEME_KEY, theme);
  return theme;
}
