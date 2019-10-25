import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validationForm from '../../common/validation/ValidationForm';
import Joi from 'joi';
import { changePassword } from '../../store/user/actions';

import ChangePasswordTab from '../components/ChangePasswordTab';

const createInitialState = () => ({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
});

class ChangePasswordTabContainer extends React.PureComponent {

    state = { ...createInitialState() }

    static getDerivedStateFromProps(props, state) {
        if (props.isSubmittedSuccessfull && !state.isSubmittedSuccessfull) {
            return {
                ...createInitialState(),
                isSubmittedSuccessfull: props.isSubmittedSuccessfull
            };
        }

        return { isSubmittedSuccessfull: props.isSubmittedSuccessfull };
    }

    handleSubmit = () => {
        this.props.changePassword({
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword,
        });
    }

    handleChange = field => e => {
        this.setState({
            [field]: e.target.value
        }, () => {
            this.props.handleValidateField(field);
            field === 'newPassword' && this.props.handleValidateField('confirmPassword');
        });
    }

    getValidationSchema = () => {
        return {
            oldPassword: Joi.string().min(8).options({ abortEarly: true }).label('Old Password'),
            newPassword: Joi.string().min(8).options({ abortEarly: true }).label('New Password'),
            confirmPassword: Joi
                .string()
                .options({ language: { any: { allowOnly: '!!Passwords must match' } }, abortEarly: true })
                .valid(this.state.newPassword),
        };
    }

    getValidationData = () => {
        return {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword,
        };
    }

    render() {
        const { renderErrors, isFieldValid, handleSubmit, isLoading, isSaving } = this.props;
        const props = {
            renderErrors,
            isFieldValid,
            handleSubmit,
            isLoading,
            isSaving,
            onChange: this.handleChange,
        };
        return <ChangePasswordTab {...this.state} {...props} />;
    }
}

ChangePasswordTabContainer.propTypes = {
    isLoading: PropTypes.bool,
    isSaving: PropTypes.bool,
    isSubmittedSuccessfull: PropTypes.bool,

    changePassword: PropTypes.func,
    handleValidateField: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    handleSubmit: PropTypes.func,
};

const mapStateToProps = state => ({
    isSubmittedSuccessfull: state.user.isSubmittedSuccessfull,
});


const mapDispatchToProps = ({
    changePassword
});

export default connect(mapStateToProps, mapDispatchToProps)(validationForm(ChangePasswordTabContainer));