import React from 'react';
import ReactDOM from 'react-dom';
import CommentsReactComponent from './../components/reactcomponents/comments-reactcomponent/comments-reactcomponent';

const $articleComments = document.querySelector('.article-comments');
if ($articleComments) {
  ReactDOM.render(<CommentsReactComponent />, $articleComments);
}
