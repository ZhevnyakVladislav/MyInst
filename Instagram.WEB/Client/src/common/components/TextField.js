import React from 'react';
import PropTypes from 'prop-types';
import {
    Field,
    Control,
    Input,
} from 'react-bulma-components/lib/components/form';


const TextField = ({ name, type, placeholder, value, isFieldValid, handleChange, renderErrors }) => {
    return <Field>
        <Control>
            <Input
                type={type}
                placeholder={placeholder}
                color={isFieldValid(name) ? 'danger' : null}
                value={value}
                onChange={handleChange(name)}
            />
            {renderErrors(name)}
        </Control>
    </Field>;

};

TextField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    isFieldValid: PropTypes.func,
    handleChange: PropTypes.func,
    renderErrors: PropTypes.func,
};

TextField.defaultProps = {
    type: 'text',
};

export default TextField;

