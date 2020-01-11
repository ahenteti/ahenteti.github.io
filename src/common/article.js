import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CommentsReduxContainer from 'components/reactcomponents/redux/containers/CommentsReduxContainer';
import store from 'components/reactcomponents/redux/store';

const $articleComments = document.querySelector('.article-comments');
if ($articleComments) {
  ReactDOM.render(
    <Provider store={store}>
      <CommentsReduxContainer />
    </Provider>,
    $articleComments
  );
}
