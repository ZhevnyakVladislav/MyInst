import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Joi from 'joi';
import validationForm from '../../components/validation/ValidationForm';
import VerificationCodeForm from '../conponents/VerificationCodeForm';

class VerificationCodeFormContainer extends React.PureComponent {
    state = {
        verificationCode: ''
    }

    static getDerivedStateFromProps(props) {
        if (props.isUserAuth) {
            props.history.push('/');
        }
        return null;
    }

    handleSubmit = () => {
       
    }

    handleChange = (field) => e => {
        this.setState({
            [field]: e.target.value
        }, () => this.props.handleValidateField(field));
    }

    getValidationSchema = () => {
        return {
            verificationCode: Joi.string().required().length(8).label('Code'),
        };
    }

    getValidationData = () => {
        return this.state;
    }

    render() {
        const { renderErrors, isFieldValid, errorMessage, handleSubmit } = this.props;
        const props = {
            renderErrors,
            isFieldValid,
            errorMessage,
            handleSubmit,
            handleChange: this.handleChange
        };
        return (
            <VerificationCodeForm {...props} {...this.state} />
        );
    }
}

const mapStateToProps = (state) => ({
    isUserAuth: state.user.isUserAuth,
    errorMessage: state.user.errorMessage,
});

const mapDispatchToProps = ({
    // confirmEmail: confirmEmail
});

VerificationCodeFormContainer.propTypes = {
    isUserAuth: PropTypes.bool,
    errorMessage: PropTypes.string,
    history: PropTypes.object,
    isShowVerification: PropTypes.bool,

    handleValidateField: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    handleSubmit: PropTypes.func,
    confirmEmail: PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(validationForm(VerificationCodeFormContainer));
