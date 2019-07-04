import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Joi from 'joi';
import validationForm from '../../components/validation/ValidationForm';
import ResetPasswordForm from '../conponents/ResetPasswordForm';
import { confirmResetPassword, resetPassword } from '../../../store/user/actions';

class VerificationCodeFormContainer extends React.PureComponent {
    state = {
        userName: '',
        verificationCode: '',
        password: ''
    }

    static getDerivedStateFromProps(props) {
        if (props.isUserAuth) {
            props.history.push('/');
        }

        return null;
    }

    handleSubmit = () => {
        this.props.isAccountCorfimed
            ? Promise.resolve(this.props.resetPassword({
                ...this.state,
                token: this.state.verificationCode
            })).then(() => this.props.history.push('/account/login'))
            : this.props.confirmResetPassword({ userName: this.state.userName });
    }

    handleChange = (field) => e => {
        this.setState({
            [field]: e.target.value
        }, () => this.props.handleValidateField(field));
    }

    getValidationSchema = () => {
        const result = {
            userName: Joi.string().required().label('User name')
        };

        if (this.props.isAccountCorfimed) {
            result.verificationCode = Joi.string().required().length(6).label('Verification code');
            result.password = Joi.string().required().min(8).label('Password');
        }

        return result;
    }

    getValidationData = () => {
        const result = {
            userName: this.state.userName
        };

        return this.props.isAccountCorfimed ? this.state : result;
    }

    render() {
        const { renderErrors, isFieldValid, errorMessage, handleSubmit, isAccountCorfimed } = this.props;
        const props = {
            renderErrors,
            isFieldValid,
            errorMessage,
            handleSubmit,
            isAccountCorfimed,
            handleChange: this.handleChange
        };
        return (
            <ResetPasswordForm {...props} {...this.state} />
        );
    }
}

const mapStateToProps = (state) => ({
    isUserAuth: state.user.isUserAuth,
    errorMessage: state.user.errorMessage,
    isAccountCorfimed: state.user.isAccountCorfimed,
});

const mapDispatchToProps = ({
    confirmResetPassword,
    resetPassword
});

VerificationCodeFormContainer.propTypes = {
    isUserAuth: PropTypes.bool,
    errorMessage: PropTypes.string,
    history: PropTypes.object,
    isAccountCorfimed: PropTypes.bool,
    isPasswordReseted: PropTypes.bool,

    resetPassword: PropTypes.func,
    confirmResetPassword: PropTypes.func,
    handleValidateField: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    handleSubmit: PropTypes.func,
    confirmEmail: PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(validationForm(VerificationCodeFormContainer));
