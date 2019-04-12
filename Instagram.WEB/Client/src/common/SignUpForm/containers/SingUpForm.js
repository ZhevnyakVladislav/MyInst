import { connect } from 'react-redux';
import SignUpForm from '../components/SignUpForm';
import actions from '../../../store/user/actions';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    signUp: (data) => dispatch(actions.signUp(data))

});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);