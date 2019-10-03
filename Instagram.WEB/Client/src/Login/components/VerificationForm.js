import React from 'react';
import validationForm from '../../common/components/validation/ValidationForm';
import PropTypes from 'prop-types';
import Joi from 'joi';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Box from 'react-bulma-components/lib/components/box';
import TextInput from '../../common/components/inputs/TextInput';
import Button from 'react-bulma-components/lib/components/button';
import { Field, Control } from 'react-bulma-components/lib/components/form';

class VerificationForm extends React.PureComponent {
    state = {
        verificationCode: ''
    }

    handleSubmit = (data) => {
        this.props.confirmEmail({
            ...data,
            userName: this.props.userName,
            password: this.props.password
        });
    }

    handleChange = (field) => e => {
        this.setState({
            [field]: e.target.value
        }, () => this.props.handleValidateField(field));
    }

    getValidationSchema = () => ({
        verificationCode: Joi.string().required().length(6).label('Verification code')
    });

    getValidationData = () => this.state;

    render() {
        const { verificationCode } = this.state;
        const {
            isFieldValid,
            renderErrors,
            isBusy,
            handleSubmit
        } = this.props;

        return (
            <Section className="is-vcentered">
                <Container>
                    <Columns centered>
                        <Columns.Column
                            mobile={{
                                size: 6,
                            }}
                            tablet={{
                                size: 4,
                            }}
                            fullhd={{
                                size: 3,
                            }}>
                            <Box>
                                <h3 className="has-text-centered has-padding-bottom-10">Enter the code we sent to your Email.</h3>
                                <form onSubmit={handleSubmit} className="margin-top-two" >
                                    <TextInput
                                        name="verificationCode"
                                        type="text"
                                        placeholder="Code"
                                        value={verificationCode}
                                        isFieldValid={isFieldValid}
                                        handleChange={this.handleChange}
                                        renderErrors={renderErrors}
                                    />
                                    <Field>
                                        <Control>
                                            <Button
                                                className="is-full-width"
                                                color="primary"
                                                onClick={handleSubmit}
                                                loading={isBusy}
                                            >
                                                Verify
                                            </Button>
                                        </Control>
                                    </Field>
                                </form>
                                <p className="has-text-centered has-padding-20">Didn't get a security code? We can resend it.</p>
                            </Box>
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        );
    }

}

VerificationForm.propTypes = {
    isBusy: PropTypes.bool,
    userName: PropTypes.string,
    password: PropTypes.string,

    isFieldValid: PropTypes.func,
    handleSubmit: PropTypes.func,
    renderErrors: PropTypes.func,
    handleValidateField: PropTypes.func,
    confirmEmail: PropTypes.func,
};

export default validationForm(VerificationForm);