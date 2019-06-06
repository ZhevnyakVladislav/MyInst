import { connect } from 'react-redux';
import SignInForm from '../components/SingInForm';
import { signIn } from '../../store/user/actions';

const mapStateToProps = (state) => ({
    isUserAuth: state.user.isUserAuth
});

const mapDispatchToProps = {
    singIn: signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm); 