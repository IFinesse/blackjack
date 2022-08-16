import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HomeScreen from './GameScreen';
import {SIGN_OUT} from '~/modules/auth/actions';
import {getAllSupportRequests} from '~/modules/devices/selectors';

function mapDispatchToProps(dispatch) {
  return {
    signOut: bindActionCreators(SIGN_OUT.START.create, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    supportData: getAllSupportRequests(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
