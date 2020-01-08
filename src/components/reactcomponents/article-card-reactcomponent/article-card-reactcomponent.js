import * as React from 'react';

import './article-card-reactcomponent.scss';

class ArticleCardReactComponent extends React.Component {
  render() {
    return (
      <div class='article-card-reactcomponent'>
        <h1>{this.props.value || 'Hello React'}</h1>
      </div>
    );
  }
}

export default ArticleCardReactComponent;
