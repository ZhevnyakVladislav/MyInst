import React from 'react';
import PropTypes from 'prop-types';
import {
    Field,
    Control,
    Input,
    Textarea
} from 'react-bulma-components/lib/components/form';


const TextField = ({
    name,
    type,
    placeholder,
    value,
    disabled,
    readOnly,
    isFieldValid,
    handleChange,
    renderErrors,
    isTextarea,
    className,
    styles
}) => {
    const InputComponent = isTextarea ? Textarea : Input;

    return <Field>
        <Control>
            <InputComponent
                type={type}
                placeholder={placeholder}
                color={isFieldValid(name) ? 'danger' : null}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                onChange={handleChange(name)}
                className={className}
                style={styles}
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
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    isTextarea: PropTypes.bool,

    isFieldValid: PropTypes.func,
    handleChange: PropTypes.func,
    renderErrors: PropTypes.func,
};

TextField.defaultProps = {
    type: 'text',
    isTextarea: false,
    isFieldValid: () => null,
    renderErrors: () => null
};

export default TextField;

