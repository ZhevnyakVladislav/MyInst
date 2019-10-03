import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignInForm from '../components/SignInForm';
import PropTypes from 'prop-types';
import { signIn } from '../../store/user/actions';

const SignInFormContainer = props => props.isUserAuth ? <Redirect to='/' /> : <SignInForm {...props} />;

SignInFormContainer.propTypes = {
    isUserAuth: PropTypes.bool
};

const mapStateToProps = state => ({
    isUserAuth: state.user.isUserAuth,
    isBusy: state.user.isBusy
});

const mapDispatchToProps = ({
    signIn: signIn
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInFormContainer); 