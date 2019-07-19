import React from 'react';
import PropTypes from 'prop-types';
import Columns from 'react-bulma-components/lib/components/columns';
import {
    Field,
    Checkbox,
    Control,
} from 'react-bulma-components/lib/components/form';

const PrivacyAndSecurityTab = ({
    isPrivateEnabled,
    onChangeIsPrivate
}) => {
    return (
        <Columns className="has-margin-top-10">
            <Columns.Column size={10} offset={1} >
                <h1>Account Privacy</h1>
                <Field className="has-margin-top-20">
                    <Control>
                        <Checkbox checked={isPrivateEnabled} onChange={onChangeIsPrivate} />
                        <label>Private Account</label>
                    </Control>
                </Field>
                <p>When your account is private, only people you approve can see your photos and videos on Instagram. Your existing followers won't be affected.</p>
                <hr/>
            </Columns.Column>
        </Columns>
    );
};

PrivacyAndSecurityTab.propTypes = {
    isPrivateEnabled: PropTypes.bool,
    onChangeIsPrivate: PropTypes.func
};

export default PrivacyAndSecurityTab;