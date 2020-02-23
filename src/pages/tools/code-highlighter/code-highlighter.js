/* eslint-disable no-undef */
import 'common/components/webcomponents/webcomponents.js';
import 'common/common.js';
import './code-highlighter.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import CodeReactComponent from 'common/components/reactcomponents/code/code-reactcomponent/code-reactcomponent.jsx';

// global variables
const highlightButton = document.querySelector('#highlight');
const resetButton = document.querySelector('#reset');
const codeInput = document.querySelector('#input');
const highlightedCode = document.querySelector('#highlighted-code');

// main
highlightButton.addEventListener('click', handleHighlightButtonClick);
resetButton.addEventListener('click', handleResetButtonClick);

// functions
function handleHighlightButtonClick(event) {
  if (codeInput.value.length === 0) {
    console.log('empty code input');
    return;
  }
  hideButton(highlightButton);
  showButton(resetButton);
  hideCodeInput();
  showHighlightedCode(codeInput.value);
}

function handleResetButtonClick(event) {
  hideButton(resetButton);
  showButton(highlightButton);
  hideHighlightedCode();
  showCodeInput();
}

function hideButton(button) {
  button.style.display = 'none';
}

function showButton(button) {
  button.style.display = 'inline';
}

function hideCodeInput() {
  codeInput.style.display = 'none';
}

function showCodeInput() {
  codeInput.style.display = 'block';
}

function hideHighlightedCode() {
  ReactDOM.unmountComponentAtNode(highlightedCode);
}

function showHighlightedCode(code) {
  ReactDOM.render(<CodeReactComponent code={code} />, highlightedCode);
}
