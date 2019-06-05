import { connect } from 'react-redux';
import SignInForm from '../components/SingInForm';
import { signIn } from '../../store/user/actions';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
    singIn: signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm); 