import React from 'react';
import PropTypes from 'prop-types';
import {
    Field,
    Control,
    Label
} from 'react-bulma-components/lib/components/form';


const FileInput = ({
    label,
    onChange
}) => {
    return <Field>
        <Control>
            <Label className="file-input-label" htmlFor="fileInput">{label}</Label>
            <input type="file" id="fileInput" accept="image/*" onChange={onChange} />
        </Control>
    </Field>;
};

FileInput.propTypes = {
    label: PropTypes.string,

    handleOnChange: PropTypes.func,
    onChange: PropTypes.func,
};

export default FileInput;