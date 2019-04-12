import { connect } from 'react-redux';
import SignInForm from '../components/SingInForm';
import actions from '../../store/user/actions';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
    singIn: actions.singIn
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm); 