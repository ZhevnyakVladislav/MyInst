import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignInForm from '../components/SignInForm';
import { signIn } from '../../store/user/actions';
import validationForm from '../../common/components/validation/ValidationForm';
import Joi from 'joi';

class SignInFormContainer extends React.PureComponent {
    state = {
        userName: '',
        password: '',
    }

    static getDerivedStateFromProps(props) {
        if (props.isUserAuth) {
            props.history.push('/');
        }
        return null;
    }

    handleSubmit = () => {
        this.props.signIn(this.state);
    }

    handleChange = (field) => e => {
        this.setState({
            [field]: e.target.value
        }, () => this.props.handleValidateField(field));
    }

    getValidationSchema = () => {
        return {
            userName: Joi.string().required().label('User name'),
            password: Joi.string().required().min(8).label('Password'),
        };
    }

    getValidationData = () => {
        return this.state;
    }

    render() {
        const { renderErrors, isFieldValid, errorMessage, handleSubmit, isLoading } = this.props;
        const props = {
            renderErrors: renderErrors,
            isFieldValid: isFieldValid,
            errorMessage: errorMessage,
            handleSubmit: handleSubmit,
            isLoading: isLoading,
            handleChange: this.handleChange
        };
        return (
            <SignInForm {...props} {...this.state} />
        );
    }

}

SignInFormContainer.propTypes = {
    isUserAuth: PropTypes.bool,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
    history: PropTypes.object,

    signIn: PropTypes.func,
    handleValidateField: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    handleSubmit: PropTypes.func,
};

const mapStateToProps = (state) => ({
    isUserAuth: state.user.isUserAuth,
    errorMessage: state.user.errorMessage,
    isLoading: state.user.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    signIn: (data) => dispatch(signIn(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(validationForm(SignInFormContainer)); 