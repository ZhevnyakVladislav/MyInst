import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm';
import { signUp, confirmEmail } from '../../../store/user/actions';
import Joi from 'joi';
import validationForm from '../../components/validation/ValidationForm';

class SignUpFormContainer extends React.PureComponent {
    state = {
        email: '',
        password: '',
        fullName: '',
        userName: '',
        verificationCode: ''
    };

    static getDerivedStateFromProps(props) {
        if (props.isUserAuth) {
            props.history.push('/');
        }
        return null;
    }

    handleSubmit = () => {
        this.props.isShowVerification
            ? this.props.confirmEmail(this.state)
            : this.props.signUp(this.state);
    }

    handleChange = (field) => e => {
        this.setState({
            [field]: e.target.value
        }, () => this.props.handleValidateField(field));
    }

    getValidationSchema = () => {
        const result = {
            email: Joi.string().required().email().label('Email'),
            password: Joi.string().required().min(8).label('Password'),
            fullName: Joi.string().required().label('Full name'),
            userName: Joi.string().required().label('User name')
        };

        if (this.props.isShowVerification) {
            result.verificationCode = Joi.string().required().length(6).label('Verification code');
        }

        return result;
    }

    getValidationData = () => {
        const result = {
            email: this.state.email,
            password: this.state.password,
            fullName: this.state.fullName,
            userName: this.state.userName
        };
        if (this.props.isShowVerification) {
            result.verificationCode = this.state.verificationCode;

        }
        return result;
    }

    render() {
        const { renderErrors, isFieldValid, errorMessage, handleSubmit, isShowVerification } = this.props;
        const props = {
            renderErrors,
            isShowVerification,
            isFieldValid,
            errorMessage,
            handleSubmit,
            handleChange: this.handleChange
        };
        return (
            <SignUpForm {...props} {...this.state} />
        );
    }
}

SignUpFormContainer.propTypes = {
    isUserAuth: PropTypes.bool,
    errorMessage: PropTypes.string,
    history: PropTypes.object,
    isShowVerification: PropTypes.bool,

    signUp: PropTypes.func,
    handleValidateField: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    handleSubmit: PropTypes.func,
    confirmEmail: PropTypes.func
};

const mapStateToProps = (state) => ({
    isUserAuth: state.user.isUserAuth,
    errorMessage: state.user.errorMessage,
    isShowVerification: state.user.isShowVerification
});

const mapDispatchToProps = ({
    signUp: signUp,
    confirmEmail: confirmEmail
});

export default connect(mapStateToProps, mapDispatchToProps)(validationForm(SignUpFormContainer));