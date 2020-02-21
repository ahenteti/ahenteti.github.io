/* eslint-disable no-undef */
import 'components/webcomponents/webcomponents.js';
import 'common/common.js';
import './code-formatter.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import CodeReactComponent from 'components/reactcomponents/code-reactcomponent/code-reactcomponent.jsx';

const formatButton = document.querySelector('#format');
const codeInput = document.querySelector('#input');
formatButton.addEventListener('click', function() {
  ReactDOM.render(<CodeReactComponent code={codeInput.value} />, document.querySelector('.code'));
  document.querySelector('.code').style.display = 'block';
  document.querySelector('.code').style.all = 'unset';
});
