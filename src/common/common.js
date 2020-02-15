/* eslint-disable no-undef */
import * as constants from 'common/constants.js';
import './pre-page-loader.js';
import React from 'react';
import ReactDOM from 'react-dom';
import store from 'components/reactcomponents/redux/store';
import { Provider } from 'react-redux';

import './article.scss';
import './article.js';
import './comments.scss';
import './common.scss';
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
});

$(window).on(constants.PAGE_CONTENT_READY_EVENT, () => {
  resizeOneLineFontSize();
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
  localStorage.setItem(constants.LOCAL_STORAGE_THEME_KEY, theme);
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
  const themeInput = searchParam.get('theme') || localStorage.getItem(constants.LOCAL_STORAGE_THEME_KEY);
  let theme;
  if (constants.DARK_THEME === themeInput) {
    theme = constants.DARK_THEME;
  } else {
    theme = constants.LIGHT_THEME;
  }
  localStorage.setItem(constants.LOCAL_STORAGE_THEME_KEY, theme);
  return theme;
}
