import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'react-bulma-components/dist/react-bulma-components.min.css';
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
import TextField from '../../../common/components/TextField';

const SignUpForm = ({
    email,
    fullName,
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
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    isFieldValid={isFieldValid}
                                    handleChange={handleChange}
                                    renderErrors={renderErrors}
                                />
                                <TextField
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={fullName}
                                    isFieldValid={isFieldValid}
                                    handleChange={handleChange}
                                    renderErrors={renderErrors}
                                />
                                <TextField
                                    name="userName"
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
                                        <Button className="is-half" onClick={handleSubmit}> Sign up</Button>
                                    </Control>
                                </Field>
                            </form>
                            <p className="has-text-centered">By signing up, you agree to our <b>Terms</b>, <b>Data Policy</b> and <b>Cookies Policy</b>.</p>
                        </Box>
                        <Box>
                            <p className="has-text-centered">Have an account? <Link to="/account/login">Log in</Link></p>
                        </Box>
                    </Columns.Column>
                </Columns>
            </Container>
        </Section>
    );
};

SignUpForm.propTypes = {
    email: PropTypes.string,
    userName: PropTypes.string,
    password: PropTypes.string,
    fullName: PropTypes.string,
    handleSubmit: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    errorMessage: PropTypes.string,
    handleChange: PropTypes.func,
};

export default SignUpForm;
