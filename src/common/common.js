/* eslint-disable no-undef */
import * as constants from 'common/constants.js';
import './pre-page-loader.js';
import React from 'react';
import ReactDOM from 'react-dom';
import store from 'common/redux/store';
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
import './input.scss';
import './textarea.scss';
import './vendor/font.css';
import './vendor/highlight/atom-one-light.min.css';
import CodeReactComponent from 'common/components/reactcomponents/code/code-reactcomponent/code-reactcomponent.jsx';
import CodeTabsReactComponent from 'common/components/reactcomponents/code/code-tabs-reactcomponent/code-tabs-reactcomponent.jsx';
import ToastLevel from 'common/components/reactcomponents/toast-reactcomponent/toast-level';
import ToastReactComponent from 'common/components/reactcomponents/toast-reactcomponent/toast-reactcomponent';

// main actions
$(window).load(() => {
  updateBodyCssClass();
});

$(window).on(constants.PAGE_CONTENT_READY_EVENT, () => {
  resizeOneLineFontSize();
  renderCodeReactComponent();
  renderCodeTabsReactComponent();
});

// functions
function renderCodeReactComponent() {
  document.querySelectorAll('pre.code').forEach((el) => {
    el.style.all = 'inherit';
    ReactDOM.render(<CodeReactComponent code={el.innerHTML} language={el.getAttribute('language')} />, el);
  });
}

function renderCodeTabsReactComponent() {
  document.querySelectorAll('div.code-tabs').forEach((el) => {
    el.style.all = 'inherit';
    ReactDOM.render(<CodeTabsReactComponent resultTab={el.querySelector('.result')} codeTabs={el.querySelectorAll('.code-tab')} />, el);
  });
}

function resizeOneLineFontSize() {
  const $oneLineTexts = document.querySelectorAll('.resize-to-fit-one-line');
  $oneLineTexts.forEach(resizeTextFontSize);
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

export function alertUser(domElement, msg, level = ToastLevel.INFO) {
  ReactDOM.unmountComponentAtNode(domElement);
  ReactDOM.render(<ToastReactComponent msg={msg} level={level} />, domElement);
}
