import { connect } from 'react-redux';
import WebsiteDivisionsReactComponent from 'common/components/reactcomponents/website-divisions-reactcomponent/website-divisions-reactcomponent';
import { changeWebsiteDivision } from '../actions/index';

const mapStateToProps = state => ({
  currentWebsiteDivision: state.currentWebsiteDivision,
  websiteDivisions: state.websiteDivisions
});

const mapDispatchToProps = dispatch => {
  return {
    changeWebsiteDivision: websiteDivision => dispatch(changeWebsiteDivision(websiteDivision))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteDivisionsReactComponent);
