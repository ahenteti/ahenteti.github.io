/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import store from 'components/reactcomponents/redux/store';
import { Provider } from 'react-redux';

import 'components/webcomponents/webcomponents.js';
import 'common/common.js';
import './index.scss';
import WebsiteDivisionsReduxContainer from 'components/reactcomponents/redux/containers/WebsiteDivisionReduxContainer';
import ArticlesDivisionReduxContainer from 'components/reactcomponents/redux/containers/ArticlesDivisionReduxContainer';

// main actions
renderWebsiteDivisionSelectComponent();
renderArticlesComponent();
// renderSearchComponent();

// helper functions
function renderWebsiteDivisionSelectComponent() {
  ReactDOM.render(
    <Provider store={store}>
      <WebsiteDivisionsReduxContainer />
    </Provider>,
    document.querySelector('.website-division')
  );
}

function renderArticlesComponent() {
  ReactDOM.render(
    <Provider store={store}>
      <ArticlesDivisionReduxContainer />
    </Provider>,
    document.querySelector('.articles')
  );
}
