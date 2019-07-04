import React from 'react';
import { Link } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
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
import TextField from '../../common/components/TextField';

const SignInForm = ({
    userName,
    password,
    handleSubmit,
    renderErrors,
    isFieldValid,
    errorMessage,
    handleChange
}) => {
    return (
        <Section>
            <Container>
                <Columns>
                    <Columns.Column size={5} offset="one-quarter">
                        <Box>
                            <Heading className="has-text-centered">Instagram</Heading>
                            <p className="has-text-centered">Sign up to see photos and videos from your friends</p>
                            {errorMessage &&
                                <Message color="danger">
                                    <Message.Body>
                                        {errorMessage}
                                    </Message.Body>
                                </Message>}
                            <form onSubmit={handleSubmit} className="margin-top-two" >
                                <TextField
                                    name="userName"
                                    type="text"
                                    placeholder="Username"
                                    value={userName}
                                    isFieldValid={isFieldValid}
                                    handleChange={handleChange}
                                    renderErrors={renderErrors}
                                />
                                <TextField
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    isFieldValid={isFieldValid}
                                    handleChange={handleChange}
                                    renderErrors={renderErrors}
                                />
                                <Field>
                                    <Control>
                                        <Button className="is-full-width" onClick={handleSubmit}> Sign in</Button>
                                    </Control>
                                </Field>
                                <div className="has-text-centered">
                                    <Link to="/account/password/reset">Forgot password?</Link>
                                </div>
                            </form>
                        </Box>
                        <Box>
                            <p>Don't have an account? <Link to="/account/register">Sign up</Link></p>
                        </Box>
                    </Columns.Column>
                </Columns>
            </Container>
        </Section>
    );
};

SignInForm.propTypes = {
    userName: PropTypes.string,
    password: PropTypes.string,
    errorMessage: PropTypes.string,

    handleSubmit: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    handleChange: PropTypes.func,

};

export default SignInForm;

