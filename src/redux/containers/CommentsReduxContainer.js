import { connect } from 'react-redux';
import CommentsReactComponent from '../../components/reactcomponents/comments-reactcomponent/comments-reactcomponent';

const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(mapStateToProps)(CommentsReactComponent);
