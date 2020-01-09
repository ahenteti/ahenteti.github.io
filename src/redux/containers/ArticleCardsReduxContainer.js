import { connect } from 'react-redux';
import ArticleCardsReactComponent from '../../components/reactcomponents/article-card/article-cards-reactcomponent/article-cards-reactcomponent';
import { selectTag } from '../actions/index';

const mapStateToProps = state => ({
  articles: state.articles,
  selectedTag: state.selectedTag
});

const mapDispatchToProps = dispatch => {
  return {
    selectTag: tag => dispatch(selectTag(tag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCardsReactComponent);
