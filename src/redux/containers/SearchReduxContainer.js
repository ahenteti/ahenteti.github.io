import { connect } from 'react-redux';
import SearchReactComponent from '../../components/reactcomponents/search/search-reactcomponent/search-reactcomponent';
import { selectTag, onArticlesFilterChange } from '../actions/index';

const mapStateToProps = state => ({
  tags: state.tags,
  selectedTag: state.selectedTag
});

const mapDispatchToProps = dispatch => {
  return {
    selectTag: tag => dispatch(selectTag(tag)),
    onArticlesFilterChange: input => dispatch(onArticlesFilterChange(input))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchReactComponent);
