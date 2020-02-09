/* eslint-disable no-undef */
import './pre-page-loader.js';
import React from 'react';
import ReactDOM from 'react-dom';
import store from 'components/reactcomponents/redux/store';
import { Provider } from 'react-redux';

import './article.scss';
import './article.js';
import './comments.scss';
import './common.scss';
import * as commonConstants from 'common/constants.js';
import './constants.scss';
import './slide-in.scss';
import './bounce.scss';
import './table.scss';
import './tooltip.scss';
import './vendor/font.css';
import HeaderReduxContainer from 'components/reactcomponents/redux/containers/HeaderReduxContainer';

// main actions
$(window).load(() => {
  renderHeaderComponent();
  updateBodyCssClass();
  store.subscribe(updateBodyCssClass);
  setTimeout(() => {
    resizeOneLineFontSize();
  }, 1000);
});

// functions
function resizeOneLineFontSize() {
  const $oneLineTexts = document.querySelectorAll('.one-line');
  $oneLineTexts.forEach(resizeTextFontSize);
}

function renderHeaderComponent() {
  ReactDOM.render(
    <Provider store={store}>
      <HeaderReduxContainer firstVisit={store.getState().firstVisit} />
    </Provider>,
    document.querySelector('header')
  );
}

function updateBodyCssClass() {
  const theme = store.getState().theme;
  document.querySelector('body').className = theme;
  localStorage.setItem(commonConstants.LOCAL_STORAGE_THEME_KEY, theme);
}

function resizeTextFontSize(text) {
  let fontSize = parseInt(window.getComputedStyle(text).fontSize);
  for (let i = fontSize; i >= 0; i--) {
    if (isOverflown(text)) {
      fontSize--;
      text.style.fontSize = fontSize + 'px';
      console.log(fontSize);
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
  if (commonConstants.DARK_THEME === themeInput) {
    theme = commonConstants.DARK_THEME;
  } else {
    theme = commonConstants.LIGHT_THEME;
  }
  localStorage.setItem(commonConstants.LOCAL_STORAGE_THEME_KEY, theme);
  return theme;
}
