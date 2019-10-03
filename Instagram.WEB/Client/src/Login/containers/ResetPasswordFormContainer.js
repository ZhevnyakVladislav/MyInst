import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { confirmResetPassword, resetPassword } from '../../store/user/actions';

const ResetPasswordFormContainer = props => props.isUserAuth ? <Redirect to='/' /> : <ResetPasswordForm {...props} />;

ResetPasswordFormContainer.propTypes = {
    isUserAuth: PropTypes.bool
};

const mapStateToProps = state => ({
    isUserAuth: state.user.isUserAuth,
    isAccountCorfimed: state.user.isAccountCorfimed,
});

const mapDispatchToProps = ({
    confirmResetPassword,
    resetPassword
});


export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordFormContainer);
