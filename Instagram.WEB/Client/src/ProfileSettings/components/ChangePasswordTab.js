import React from 'react';
import PropTypes from 'prop-types';
import Columns from 'react-bulma-components/lib/components/columns';
import TextInput from '../../common/inputs/TextInput';
import { Label } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';

const ChangePasswordTab = ({
    oldPassword,
    newPassword,
    confirmPassword,

    handleSubmit,
    renderErrors,
    isFieldValid,
    onChange,
    isSaving,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Columns>
                <Columns.Column className="has-text-right" size={3}>
                    <Label>Old Password</Label>
                </Columns.Column>
                <Columns.Column size={7}>
                    <TextInput
                        name="oldPassword"
                        type="password"
                        value={oldPassword}
                        isFieldValid={isFieldValid}
                        handleChange={onChange}
                        renderErrors={renderErrors}
                    />
                </Columns.Column>
            </Columns>
            <Columns>
                <Columns.Column className="has-text-right" size={3}>
                    <Label>New Password</Label>
                </Columns.Column>
                <Columns.Column size={7}>
                    <TextInput
                        name="newPassword"
                        type="password"
                        value={newPassword}
                        isFieldValid={isFieldValid}
                        handleChange={onChange}
                        renderErrors={renderErrors}
                    />
                </Columns.Column>
            </Columns>
            <Columns>
                <Columns.Column className="has-text-right" size={3}>
                    <Label>Confirm New Password</Label>
                </Columns.Column>
                <Columns.Column size={7}>
                    <TextInput
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
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
                        Change Password
                    </Button>
                </Columns.Column>
            </Columns>
        </form>
    );
};

ChangePasswordTab.propTypes = {
    oldPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
    isSaving: PropTypes.bool,

    handleSubmit: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    onChange: PropTypes.func,
};

export default ChangePasswordTab;