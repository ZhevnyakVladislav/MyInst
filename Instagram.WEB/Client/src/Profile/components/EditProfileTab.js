import React from 'react';
import PropTypes from 'prop-types';
import Columns from 'react-bulma-components/lib/components/columns';
import Media from 'react-bulma-components/lib/components/media';
import TextInput from '../../common/components/inputs/TextInput';
import FileInput from '../../common/components/inputs/FileInput';
import { Label } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Image from 'react-bulma-components/lib/components/image';

const EditProfileTab = ({
    userName,
    fullName,
    website,
    bio,
    email,
    phone,
    handleSubmit,
    renderErrors,
    isFieldValid,
    errorMessage,
    onChange,
    isLoading,
    isSaving,
    onImageChange,
    imageUrl
}) => {
    return (<>
        <Columns>
            <Columns.Column className="is-flex flex-column align-items-flex-end" size={3}>
                <Media>
                    <Media.Item position="right">
                        <figure className="image is-64x64">
                            <img className="is-rounded avatar" src={imageUrl} />
                        </figure>
                    </Media.Item>
                </Media>
            </Columns.Column>
            <Columns.Column>
                <Label>{userName}</Label>
                <FileInput label="Change Profile Photo" renderErrors={renderErrors} onChange={onImageChange} />
            </Columns.Column>
        </Columns>
        <form onSubmit={handleSubmit}>
            <Columns>
                <Columns.Column className="is-flex flex-column align-items-flex-end" size={3}>
                    <Label>Name</Label>
                </Columns.Column>
                <Columns.Column size={7}>
                    <TextInput
                        name="fullName"
                        placeholder="Full Name"
                        value={fullName}
                        isFieldValid={isFieldValid}
                        handleChange={onChange}
                        renderErrors={renderErrors}
                    />
                </Columns.Column>
            </Columns>
            <Columns>
                <Columns.Column className="is-flex flex-column align-items-flex-end" size={3}>
                    <Label>Username</Label>
                </Columns.Column>
                <Columns.Column size={7}>
                    <TextInput
                        name="userName"
                        placeholder="Username"
                        value={userName}
                        isFieldValid={isFieldValid}
                        handleChange={onChange}
                        renderErrors={renderErrors}
                    />
                </Columns.Column>
            </Columns>
            <Columns>
                <Columns.Column className="is-flex flex-column align-items-flex-end" size={3}>
                    <Label>Website</Label>
                </Columns.Column>
                <Columns.Column size={7}>
                    <TextInput
                        name="website"
                        placeholder=""
                        value={website}
                        isFieldValid={isFieldValid}
                        handleChange={onChange}
                        renderErrors={renderErrors}
                    />
                </Columns.Column>
            </Columns>
            <Columns>
                <Columns.Column className="is-flex flex-column align-items-flex-end" size={3}>
                    <Label>Bio</Label>
                </Columns.Column>
                <Columns.Column size={7}>
                    <TextInput
                        name="bio"
                        placeholder=""
                        value={bio}
                        isFieldValid={isFieldValid}
                        handleChange={onChange}
                        renderErrors={renderErrors}
                    />
                </Columns.Column>
            </Columns>
            <Columns>
                <Columns.Column className="is-flex flex-column align-items-flex-end" size={3}>
                    <Label>Email</Label>
                </Columns.Column>
                <Columns.Column size={7}>
                    <TextInput
                        name="email"
                        placeholder=""
                        value={email}
                        readOnly
                        isFieldValid={isFieldValid}
                        handleChange={onChange}
                        renderErrors={renderErrors}
                    />
                </Columns.Column>
            </Columns>
            <Columns>
                <Columns.Column className="is-flex flex-column align-items-flex-end" size={3}>
                    <Label>Phone Number</Label>
                </Columns.Column>
                <Columns.Column size={7}>
                    <TextInput
                        name="phone"
                        placeholder=""
                        type="tel"
                        value={phone}
                        isFieldValid={isFieldValid}
                        handleChange={onChange}
                        renderErrors={renderErrors}
                    />
                </Columns.Column>
            </Columns>
            <Columns>
                <Columns.Column size={7} offset={3}>
                    <Button
                        color="primary"
                        onClick={handleSubmit}
                        loading={isSaving}
                    >
                        Submit
                    </Button>
                </Columns.Column>
            </Columns>
        </form>
    </>
    );
};

EditProfileTab.propTypes = {
    fullName: PropTypes.string,
    userName: PropTypes.string,
    website: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    imageUrl: PropTypes.string,
    isSaving: PropTypes.bool,

    handleSubmit: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    onChange: PropTypes.func,
    onImageChange: PropTypes.func,
};

export default EditProfileTab;