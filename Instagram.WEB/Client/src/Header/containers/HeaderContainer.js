import { connect } from 'react-redux';
import Header from '../components/Header';
import { logOut } from '../../store/user/actions';

const mapStateToProps = (state) => ({
    isUserAuth: state.user.isUserAuth,
    userName: state.user.data.userName
});

const mapDispatchToProps = {
    logOut: logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Header); 
