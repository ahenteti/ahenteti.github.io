/* eslint-disable no-undef */
import 'common/components/webcomponents/webcomponents.js';
import './code-highlighter.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import CodeReactComponent from 'common/components/reactcomponents/code/code-reactcomponent/code-reactcomponent.jsx';
import ToastLevel from 'common/components/reactcomponents/toast-reactcomponent/toast-level';
import { alertUser } from 'common/common.js';

// global variables
const toast = document.querySelector('#toast');
const highlightButton = document.querySelector('#highlight');
const resetButton = document.querySelector('#reset');
const languageInput = document.querySelector('#language-input');
const codeInput = document.querySelector('#code-input');
const highlightedCode = document.querySelector('#highlighted-code');

// main
highlightButton.addEventListener('click', handleHighlightButtonClick);
resetButton.addEventListener('click', handleResetButtonClick);

// functions
function handleHighlightButtonClick(event) {
  if (codeInput.value.length === 0) {
    alertUser(toast, 'No code to highlight', ToastLevel.ERROR);
    return;
  }
  hide(highlightButton);
  hide(languageInput);
  show(resetButton);
  hide(codeInput);
  showHighlightedCode();
}

function handleResetButtonClick(event) {
  hide(resetButton);
  show(highlightButton);
  show(languageInput);
  hideHighlightedCode();
  show(codeInput, 'block');
}

function hide(el) {
  el.style.display = 'none';
}

function show(el, display = 'inline') {
  el.style.display = display;
}

function hideHighlightedCode() {
  ReactDOM.unmountComponentAtNode(highlightedCode);
}

function showHighlightedCode() {
  ReactDOM.render(<CodeReactComponent code={codeInput.value} language={languageInput.value} />, highlightedCode);
}
