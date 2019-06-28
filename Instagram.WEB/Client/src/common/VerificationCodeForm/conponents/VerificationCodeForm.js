import React from 'react';
import PropTypes from 'prop-types';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Box from 'react-bulma-components/lib/components/box';
import Heading from 'react-bulma-components/lib/components/heading';
import {
    Field,
    Control,
} from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Message from 'react-bulma-components/lib/components/message';
import TextField from '../../components/TextField';

const VerificatioCodeForm = (
    verificationCode,
    handleSubmit,
    renderErrors,
    isFieldValid,
    errorMessage,
    handleChange,
) => {
    return (
        <Section>
            <Container>
                <Columns>
                    <Columns.Column size={5} offset="one-quarter">
                        <Box>
                            {errorMessage &&
                                <Message color="danger">
                                    <Message.Body>
                                        {errorMessage}
                                    </Message.Body>
                                </Message>}
                            <form onSubmit={handleSubmit} className="margin-top-two" >
                                <TextField
                                    name="verificationCode"
                                    placeholder="Enter code"
                                    value={verificationCode}
                                    isFieldValid={isFieldValid}
                                    handleChange={handleChange}
                                    renderErrors={renderErrors}
                                />
                                <Field >
                                    <Control>
                                        <Button className="is-full-width" onClick={handleSubmit}>Continue</Button>
                                    </Control>
                                </Field>
                            </form>
                        </Box>
                    </Columns.Column>
                </Columns>
            </Container>
        </Section>
    );
};

VerificatioCodeForm.propTypes = {
    verificationCode: PropTypes.string,
    errorMessage: PropTypes.string,

    handleSubmit: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    handleChange: PropTypes.func,
};

export default VerificatioCodeForm;