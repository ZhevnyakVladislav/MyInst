import { connect } from 'react-redux';
import SignUpForm from '../components/SignUpForm';
import { signUp } from '../../../store/user/actions';

const mapStateToProps = (state) => ({
    errorMessage: state.user.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
    signUp: (data) => dispatch(signUp(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);