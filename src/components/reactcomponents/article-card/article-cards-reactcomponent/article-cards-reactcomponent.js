import * as React from 'react';

import './article-cards-reactcomponent.scss';
import ArticleCardsByCategoryReactComponent from '../article-cards-by-category-reactcomponent/article-cards-by-category-reactcomponent';

class ArticleCardsReactComponent extends React.Component {
  render() {
    return (
      <div className='article-cards-reactcomponent'>
        {Object.keys(this.props.articles).map(category => {
          return (
            <ArticleCardsByCategoryReactComponent
              key={category}
              category={category}
              selectedTag={this.props.selectedTag}
              selectTag={this.props.selectTag}
              articles={this.props.articles[category]}
            ></ArticleCardsByCategoryReactComponent>
          );
        })}
      </div>
    );
  }
}

export default ArticleCardsReactComponent;
