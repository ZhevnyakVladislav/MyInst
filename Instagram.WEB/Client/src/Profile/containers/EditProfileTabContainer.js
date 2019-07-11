
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validationForm from '../../common/components/validation/ValidationForm';
import Joi from 'joi';
import EditProfileTab from '../components/EditProfileTab';
import { updateProfileImage, loadEditProfileData, updateProfile } from '../../store/profile/actions';
import { isEqual } from 'lodash';

class EditProfileContainer extends React.PureComponent {

    state = {
        fullName: this.props.profileData.fullName,
        userName: this.props.profileData.userName,
        website: this.props.profileData.website,
        bio: this.props.profileData.bio,
        email: this.props.profileData.email,
        phone: this.props.profileData.phone
    }

    static getDerivedStateFromProps(props, state) {
        if (!isEqual(props.profileData, state.prevProfileData)) {
            return {
                ...props.profileData,
                prevProfileData: props.profileData,
            };
        }

        return null;
    }

    componentDidMount() {
        this.props.loadProfileData(this.props.profileData.userName);
    }

    handleSubmit = () => {
        const { fullName, userName, website, bio, email, phone } = this.state;
        this.props.updateProfile({
            baseUserName: this.props.profileData.userName,
            fullName,
            userName,
            website,
            bio,
            email,
            phone,
        });
    }

    handleChange = field => e => {
        this.setState({
            [field]: e.target.value
        }, () => this.props.handleValidateField(field));
    }

    handleImageChange = (e) => {
        var data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('userName', this.state.userName);
        this.props.updateProfileImage(data);
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
        const { renderErrors, isFieldValid, errorMessage, handleSubmit, isLoading, isSaving } = this.props;
        const props = {
            renderErrors,
            isFieldValid,
            errorMessage,
            handleSubmit,
            isLoading,
            isSaving,
            imageUrl: this.props.profileData.imageUrl,
            onChange: this.handleChange,
            onImageChange: this.handleImageChange
        };
        return (
            <EditProfileTab {...props} {...this.state} />
        );
    }
}

EditProfileContainer.propTypes = {
    profileData: PropTypes.shape({
        fullName: PropTypes.string,
        userName: PropTypes.string,
        bio: PropTypes.string,
        website: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        imageUrl: PropTypes.string,
    }),
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,
    isSaving: PropTypes.bool,

    handleValidateField: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    handleSubmit: PropTypes.func,
    updateProfileImage: PropTypes.func,
    loadProfileData: PropTypes.func,
    updateProfile: PropTypes.func
};

const mapStateToProps = (state) => {
    const { fullName, imageUrl, website, bio, email, phone, isSaving } = state.profile;

    return {
        profileData: {
            fullName,
            imageUrl,
            website,
            bio,
            email,
            phone,
            userName: state.user.userName
        },
        isSaving
    };
};

const mapDispatchToProps = ({
    updateProfileImage,
    updateProfile,
    loadProfileData: loadEditProfileData,
});

export default connect(mapStateToProps, mapDispatchToProps)(validationForm(EditProfileContainer));