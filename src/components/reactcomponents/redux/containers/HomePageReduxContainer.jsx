import { connect } from 'react-redux';
import HomePageReactComponent from 'components/reactcomponents/home-page-reactcomponent/home-page-reactcomponent';
import { selectTag, onArticlesFilterChange } from '../actions/index';

const mapStateToProps = state => ({
  articles: state.articles,
  tags: state.tags,
  selectedTag: state.selectedTag,
  currentWebsiteDivision: state.currentWebsiteDivision,
  tools: state.tools
});

const mapDispatchToProps = dispatch => {
  return {
    selectTag: tag => dispatch(selectTag(tag)),
    onArticlesFilterChange: input => dispatch(onArticlesFilterChange(input))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageReactComponent);
