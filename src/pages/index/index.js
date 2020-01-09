/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import store from 'redux/store';
import { Provider } from 'react-redux';

import 'components/webcomponents/webcomponents.js';
import 'common/common.js';
import './index.scss';
import ArticleCardsReduxContainer from '../../redux/containers/ArticleCardsReduxContainer';
import SearchReduxContainer from '../../redux/containers/SearchReduxContainer';

// main actions
renderArticlesComponent();
renderSearchComponent();

// helper functions
function renderArticlesComponent() {
  ReactDOM.render(
    <Provider store={store}>
      <ArticleCardsReduxContainer firstVisit={store.getState().articles} />
    </Provider>,
    document.querySelector('.articles')
  );
}

function renderSearchComponent() {
  ReactDOM.render(
    <Provider store={store}>
      <SearchReduxContainer tags={store.getState().tags} selectedTag={store.getState().selectedTag} />
    </Provider>,
    document.querySelector('.search')
  );
}
