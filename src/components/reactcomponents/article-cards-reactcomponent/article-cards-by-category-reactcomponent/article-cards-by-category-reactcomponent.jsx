import * as React from 'react';
import './article-cards-by-category-reactcomponent.scss';
import ArticleCardReactComponent from '../article-card-reactcomponent/article-card-reactcomponent';
import FancyTitleReactComponent from '../../fancy-title-reactcomponent/fancy-title-reactcomponent';

class ArticleCardsByCategoryReactComponent extends React.Component {
  render() {
    return (
      <div className='article-cards-by-category-reactcomponent'>
        <FancyTitleReactComponent value={this.props.category}></FancyTitleReactComponent>
        <div className='articles-by-category'>
          {this.props.articles.map(article => {
            return (
              <ArticleCardReactComponent
                key={article.slug}
                selectedTag={this.props.selectedTag}
                selectTag={this.props.selectTag}
                article={article}
              ></ArticleCardReactComponent>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ArticleCardsByCategoryReactComponent;
