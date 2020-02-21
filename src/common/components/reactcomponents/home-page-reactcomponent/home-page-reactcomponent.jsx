import * as React from 'react';
import './home-page-reactcomponent.scss';
import * as constants from 'common/constants';
import ArticlesDivisionReactComponent from 'common/components/reactcomponents/articles-division-reactcomponent/articles-division-reactcomponent';
import ToolsDivisionReactComponent from 'common/components/reactcomponents/tools-division-reactcomponent/tools-division-reactcomponent';

class HomePageReactComponent extends React.Component {
  render() {
    return (
      <div className='home-page-reactcomponent'>
        {this.props.currentWebsiteDivision === constants.ARTICLES_WEBSITE_DIVISION ? (
          <ArticlesDivisionReactComponent
            articles={this.props.articles}
            tags={this.props.tags}
            selectedTag={this.props.selectedTag}
            selectTag={this.props.selectTag}
            onArticlesFilterChange={this.props.onArticlesFilterChange}
          />
        ) : (
          <ToolsDivisionReactComponent tools={this.props.tools} />
        )}
      </div>
    );
  }
}

export default HomePageReactComponent;
