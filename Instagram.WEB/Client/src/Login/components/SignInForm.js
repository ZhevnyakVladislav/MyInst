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
    handleChange,
    isLoading
}) => {
    return (
        <Section>
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
                        }}
                    >
                        <Box>
                            <Heading className="has-text-centered">Instagram</Heading>
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
                                        <Button
                                            className="is-full-width"
                                            color="primary"
                                            onClick={handleSubmit}
                                            loading={isLoading}
                                        >
                                            Log In
                                        </Button>
                                    </Control>
                                </Field>
                            </form>
                            <Columns className="is-vcentered">
                                <Columns.Column size={5}>
                                    <hr />
                                </Columns.Column>
                                <Columns.Column>
                                    <p>OR</p>
                                </Columns.Column>
                                <Columns.Column size={5}>
                                    <hr />
                                </Columns.Column>
                            </Columns>
                            <div className="has-text-centered">
                                <Link to="/account/password/reset">Forgot password?</Link>
                            </div>
                        </Box>
                        <Box className="has-text-centered">
                            <p>Don't have an account? <Link to="/account/register">Sign up</Link></p>
                        </Box>
                    </Columns.Column>
                </Columns>
            </Container>
        </Section >
    );
};

SignInForm.propTypes = {
    userName: PropTypes.string,
    password: PropTypes.string,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,

    handleSubmit: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    handleChange: PropTypes.func,

};

export default SignInForm;

