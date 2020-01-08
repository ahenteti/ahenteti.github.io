import { connect } from 'react-redux';
import { changeThemeColor } from '../actions';
import HeaderReactComponent from '../../components/reactcomponents/header-reactcomponent/header-reactcomponent';

const mapStateToProps = state => ({
  unknownChangeThemeColorFeature: state.unknownChangeThemeColorFeature
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeThemeColor: () => dispatch(changeThemeColor())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderReactComponent);
