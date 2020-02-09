import { connect } from 'react-redux';
import ArticlesDivisionReactComponent from 'components/reactcomponents/articles-division-reactcomponent/articles-division-reactcomponent';
import { selectTag, onArticlesFilterChange } from '../actions/index';

const mapStateToProps = state => ({
  articles: state.articles,
  tags: state.tags,
  selectedTag: state.selectedTag
});

const mapDispatchToProps = dispatch => {
  return {
    selectTag: tag => dispatch(selectTag(tag)),
    onArticlesFilterChange: input => dispatch(onArticlesFilterChange(input))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesDivisionReactComponent);
