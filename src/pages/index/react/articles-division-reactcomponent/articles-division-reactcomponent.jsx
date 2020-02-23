import * as React from 'react';
import SearchReactComponent from 'pages/index/react/search-reactcomponent/search-reactcomponent';
import ArticleCardsReactComponent from 'pages/index/react/article-cards-reactcomponent/article-cards-reactcomponent';
import './articles-division-reactcomponent.scss';

class ArticlesDivisionReactComponent extends React.Component {
  render() {
    return (
      <div className='articles-division-reactcomponent'>
        <SearchReactComponent
          tags={this.props.tags}
          selectedTag={this.props.selectedTag}
          selectTag={this.props.selectTag}
          onArticlesFilterChange={this.props.onArticlesFilterChange}
        />
        <ArticleCardsReactComponent
          articles={this.props.articles}
          selectedTag={this.props.selectedTag}
          selectTag={this.props.selectTag}
        />
      </div>
    );
  }
}

export default ArticlesDivisionReactComponent;
