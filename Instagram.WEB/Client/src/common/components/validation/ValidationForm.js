import React from 'react';
import Joi from 'joi';
import getDisplayName from 'react-display-name';
import {
    Help
} from 'react-bulma-components/lib/components/form';

export default function validationForm(WrappedComponent) {

    class ValidationForm extends React.Component {
        constructor(props) {
            super(props);

            this.wrappedComponentInstanceRef = React.createRef();
            this.state = {
                triedToSubmit: false,
                errors: {}
            };
        }

        get wrappedComponentInstance() {
            return this.wrappedComponentInstanceRef.current;
        }

        handleValidate = () => {
            const valitationData = this.getValidationData();
            const validationSchema = this.getValidationSchema();

            return new Promise((resolve, reject) => {
                const result = Joi.validate(valitationData, validationSchema, { abortEarly: false });

                if (result.error) {
                    const errorObj = this.setErrors(result.error.details);
                    reject(errorObj);
                } else {
                    resolve(result.value);
                }
            });
        }

        handleValidateField = (field) => {
            if (this.state.triedToSubmit) {
                const value = this.getValidationData()[field];
                const schema = this.getValidationSchema()[field];

                const result = Joi.validate(value, schema, { abortEarly: false });
                let errors = null;

                if (result.error) {
                    errors = result.error.details.map(details => details.message);
                }

                this.setState({
                    errors: {
                        ...this.state.errors,
                        [field]: errors
                    }
                });
            }
        }

        setErrors = (errors) => {
            const errorObj = errors.reduce((result, error) => {
                if (result[error.context.key]) {
                    result[error.context.key].push(error.message);
                } else {
                    result[error.context.key] = [error.message];
                }
                return result;
            }, {});
            this.setState({
                errors: errorObj,
                triedToSubmit: true
            });
            return errorObj;
        }

        isFieldValid = (field) => {
            return !!this.state.errors[field];
        }

        renderErrors = (field) => {
            const errors = this.state.errors[field];

            if (errors) {
                return errors.map((error, i) => <Help key={field + i} color="danger">{error}</Help>);
            }
            return null;
        }

        getValidationSchema = () => {
            if (typeof this.wrappedComponentInstance.getValidationSchema !== 'function') {
                return {};
            }

            return this.wrappedComponentInstance.getValidationSchema();
        }

        getValidationData = () => {
            if (typeof this.wrappedComponentInstance.getValidationData !== 'function') {
                return {};
            }

            return this.wrappedComponentInstance.getValidationData();
        }

        handleSubmit = (e) => {
            e.preventDefault();
            this.handleValidate().then(data => {
                this.wrappedComponentInstance.handleSubmit(data);
            });
        }

        render() {
            const newProps = {
                errors: this.state.errors,
                handleSubmit: this.handleSubmit,
                renderErrors: this.renderErrors,
                handleValidateField: this.handleValidateField,
                isFieldValid: this.isFieldValid
            };

            return <WrappedComponent
                {...this.props}
                {...newProps}
                ref={this.wrappedComponentInstanceRef}
            />;
        }
    }

    ValidationForm.displayName = `ValalidationForm(${getDisplayName(WrappedComponent)})`;

    return ValidationForm;
}