import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Box from 'react-bulma-components/lib/components/box';
import {
    Field,
    Control,
} from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Message from 'react-bulma-components/lib/components/message';
import TextField from '../../components/inputs/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const ResetPasswordForm = ({
    verificationCode,
    userName,
    password,
    isAccountCorfimed,
    handleSubmit,
    renderErrors,
    isFieldValid,
    handleChange
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
                        }}>
                        <Box className="is-marginless">
                            <Columns>
                                <Columns.Column className="has-text-centered is-vcentered" size={4} offset={4}>
                                    <FontAwesomeIcon className="is-vcentered" icon={faLock} size="4x" />
                                </Columns.Column>
                            </Columns>
                            <Columns>
                                <Columns.Column className="has-text-centered" size={10} offset={1}>
                                    <h3><b>Trouble Logging In?</b></h3>
                                    <p>Enter your username or email and we'll send you a link to get back into your account.</p>
                                </Columns.Column>
                            </Columns>
                           
                            <form onSubmit={handleSubmit} className="margin-top-two" >
                                <TextField
                                    name="userName"
                                    placeholder="Username"
                                    value={userName}
                                    isFieldValid={isFieldValid}
                                    handleChange={handleChange}
                                    renderErrors={renderErrors}
                                />
                                {isAccountCorfimed &&
                                    <>
                                        <TextField
                                            name="verificationCode"
                                            placeholder="Enter code"
                                            value={verificationCode}
                                            isFieldValid={isFieldValid}
                                            handleChange={handleChange}
                                            renderErrors={renderErrors}
                                        />
                                        <TextField
                                            name="password"
                                            type="password"
                                            placeholder="New password"
                                            value={password}
                                            isFieldValid={isFieldValid}
                                            handleChange={handleChange}
                                            renderErrors={renderErrors}
                                        />
                                    </>
                                }
                                <Field >
                                    <Control>
                                        <Button className="is-full-width" color="primary" onClick={handleSubmit}>{isAccountCorfimed ? 'Continue' : 'Send Verification Code'}</Button>
                                    </Control>
                                </Field>

                            </form>
                            <Columns className="is-vcentered is-marginless">
                                <Columns.Column className="has-padding-top-5 has-padding-bottom-5" size={5}>
                                    <hr />
                                </Columns.Column>
                                <Columns.Column>
                                    <p>OR</p>
                                </Columns.Column>
                                <Columns.Column className="has-padding-top-5 has-padding-bottom-5" size={5}>
                                    <hr />
                                </Columns.Column>
                            </Columns>
                            <div className="has-text-centered">
                                <Link to="/account/register">Create New Account</Link>
                            </div>
                        </Box>
                        <Box className="has-text-centered has-height-40 has-padding-10">
                            <Link to="/account/login" className="is-dark">
                                Back to Login
                            </Link>
                        </Box>
                    </Columns.Column>
                </Columns>
            </Container>
        </Section >
    );
};

ResetPasswordForm.propTypes = {
    verificationCode: PropTypes.string,
    password: PropTypes.string,
    userName: PropTypes.string,
    isAccountCorfimed: PropTypes.bool,

    handleSubmit: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    handleChange: PropTypes.func,
};

export default ResetPasswordForm;