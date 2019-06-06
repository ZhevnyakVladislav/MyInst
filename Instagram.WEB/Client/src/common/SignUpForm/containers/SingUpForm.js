import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm';
import { signUp } from '../../../store/user/actions';
import Joi from 'joi';
import validationForm from '../../components/validation/ValidationForm';

class SignUpFormContainer extends React.PureComponent {
    state = {
        email: '',
        password: '',
        fullName: '',
        userName: '',
    };

    static getDerivedStateFromProps(props) {
        if (props.isUserAuth) {
            props.history.push('/');
        }
        return null;
    }

    handleSubmit = () => {
        this.props.signUp(this.state);
    }

    handleChange = (field) => e => {
        this.setState({
            [field]: e.target.value
        }, () => this.props.handleValidateField(field));
    }

    getValidationSchema = () => {
        return {
            email: Joi.string().required().email().label('Email'),
            password: Joi.string().required().min(8).label('Password'),
            fullName: Joi.string().required().label('Full name'),
            userName: Joi.string().required().label('User name'),
        };
    }

    getValidationData = () => {
        return this.state;
    }

    render() {
        const { renderErrors, isFieldValid, errorMessage, handleSubmit } = this.props;
        const props = {
            renderErrors: renderErrors,
            isFieldValid: isFieldValid,
            errorMessage: errorMessage,
            handleSubmit: handleSubmit,
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
    signUp: PropTypes.func,
    history: PropTypes.object,
    handleValidateField: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    handleSubmit: PropTypes.func,
};

const mapStateToProps = (state) => ({
    isUserAuth: state.user.isUserAuth,
    errorMessage: state.user.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
    signUp: (data) => dispatch(signUp(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(validationForm(SignUpFormContainer));