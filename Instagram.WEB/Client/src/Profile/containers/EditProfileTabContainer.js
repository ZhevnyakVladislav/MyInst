
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validationForm from '../../common/components/validation/ValidationForm';
import Joi from 'joi';
import EditProfileTab from '../components/EditProfileTab';

class EditProfileContainer extends React.PureComponent {

    state = {
        fullName: this.props.fullName,
        userName: this.props.userName,
        website: this.props.website,
        bio: this.props.bio,
        email: this.props.email,
        phone: this.props.phone
    }

    handleSubmit = () => {
        console.log(2134);
    }

    handleChange = field => e => {
        this.setState({
            [field]: e.target.value
        }, () => this.props.handleValidateField(field));
    }

    handleImageChange = (e) => {
        console.log(e.target.files[0]);
    }

    getValidationSchema = () => {
        return {
            userName: Joi.string().required().label('User name'),
        };
    }

    getValidationData = () => {
        return {
            userName: this.state.userName
        };
    }

    render() {
        const { renderErrors, isFieldValid, errorMessage, handleSubmit, isLoading } = this.props;
        const props = {
            renderErrors: renderErrors,
            isFieldValid: isFieldValid,
            errorMessage: errorMessage,
            handleSubmit: handleSubmit,
            isLoading: isLoading,
            onChange: this.handleChange,
            onImageChange: this.handleImageChange
        };
        return (
            <EditProfileTab {...props} {...this.state} />
        );
    }
}

EditProfileContainer.propTypes = {
    fullName: PropTypes.string,
    userName: PropTypes.string,
    website: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,

    handleValidateField: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    handleSubmit: PropTypes.func,
};

const mapStateToProps = (state) => ({
    userName: state.user.userName,
    fullName: state.profile.fullName
});

const mapDispatchToProps = ({
});

export default connect(mapStateToProps, mapDispatchToProps)(validationForm(EditProfileContainer));