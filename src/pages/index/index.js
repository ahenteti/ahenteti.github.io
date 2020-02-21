/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import store from 'common/redux/store';
import { Provider } from 'react-redux';

import 'common/components/webcomponents/webcomponents.js';
import 'common/common.js';
import './index.scss';
import WebsiteDivisionsReduxContainer from 'common/redux/containers/WebsiteDivisionReduxContainer';
import HomePageReduxContainer from 'common/redux/containers/HomePageReduxContainer';

// main actions
renderWebsiteDivisionSelectComponent();
renderWebsiteDivision();

// helper functions
function renderWebsiteDivisionSelectComponent() {
  ReactDOM.render(
    <Provider store={store}>
      <WebsiteDivisionsReduxContainer />
    </Provider>,
    document.querySelector('.website-division-select-component')
  );
}

function renderWebsiteDivision() {
  ReactDOM.render(
    <Provider store={store}>
      <HomePageReduxContainer />
    </Provider>,
    document.querySelector('.website-division')
  );
}
