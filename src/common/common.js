import './article.scss';
import './article.js';
import './comments.scss';
import './common.scss';
import * as constants from './constants.js';
import './constants.scss';
import './slide-in.scss';
import './table.scss';
import './tooltip.scss';
import './vendor/highlight/atom-one-light.min.css';
import './vendor/font.css';

// global variables
const $body = document.querySelector('body');
const $oneLineTexts = document.querySelectorAll('.one-line');

// main actions
$body.className = findTheme();
$oneLineTexts.forEach(resizeTextFontSize);

// functions
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
  let res = searchParam.get('theme');
  if (!res) {
    res = localStorage.getItem(constants.LOCAL_STORAGE_THEME_KEY);
  }
  localStorage.setItem(constants.LOCAL_STORAGE_THEME_KEY, res);
  return res;
}
