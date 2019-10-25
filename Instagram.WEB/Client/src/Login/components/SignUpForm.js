import React from 'react';
import validationForm from '../../common/validation/ValidationForm';
import Joi from 'joi';
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
import TextField from '../../common/inputs/TextInput';

class SignUpForm extends React.PureComponent {
    state = {
        email: '',
        fullName: '',
    };

    handleSubmit = () => {
        this.props.signUp({
            ...this.state,
            userName: this.props.userName,
            password: this.props.password,

        });
    }

    handleChange = (field) => e => {
        this.setState({
            [field]: e.target.value
        }, () => this.props.handleValidateField(field));
    }

    getValidationSchema = () => ({
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().min(8).label('Password'),
        fullName: Joi.string().required().label('Full name'),
        userName: Joi.string().required().label('User name')
    });

    getValidationData = () => ({
        email: this.state.email,
        fullName: this.state.fullName,
        userName: this.props.userName,
        password: this.props.password,
    })

    render() {
        const {
            email,
            fullName,
        } = this.state;
        const {
            renderErrors,
            isFieldValid,
            isLoading,
            handleSubmit,
            userName,
            password,
            onChangeUserName,
            onChangePassword
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
                                <Heading className="has-text-centered">Instagram</Heading>
                                <h3 className="has-text-centered has-padding-bottom-10">Sign up to see photos and videos from your friends</h3>
                                <Field>
                                    <Control>
                                        <Button className="is-full-width" color="primary" onClick={() => null}>Log in with Facebook</Button>
                                    </Control>
                                </Field>
                                <Columns className="is-vcentered">
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
                                <form onSubmit={handleSubmit} className="margin-top-two" >
                                    <TextField
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        isFieldValid={isFieldValid}
                                        handleChange={this.handleChange}
                                        renderErrors={renderErrors}
                                    />
                                    <TextField
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={fullName}
                                        isFieldValid={isFieldValid}
                                        handleChange={this.handleChange}
                                        renderErrors={renderErrors}
                                    />
                                    <TextField
                                        name="userName"
                                        placeholder="Username"
                                        value={userName}
                                        isFieldValid={isFieldValid}
                                        handleChange={onChangeUserName}
                                        renderErrors={renderErrors}
                                    />
                                    <TextField
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        isFieldValid={isFieldValid}
                                        handleChange={onChangePassword}
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
                                                Sign up
                                            </Button>
                                        </Control>
                                    </Field>
                                </form>
                                <p className="has-text-centered has-padding-20">By signing up, you agree to our <b>Terms</b>, <b>Data Policy</b> and <b>Cookies Policy</b>.</p>
                            </Box>
                            <Box>
                                <p className="has-text-centered">Have an account? <Link to="/account/login">Log in</Link></p>
                            </Box>
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        );
    }
}

SignUpForm.propTypes = {
    email: PropTypes.string,
    userName: PropTypes.string,
    password: PropTypes.string,
    fullName: PropTypes.string,
    verificationCode: PropTypes.string,
    isLoading: PropTypes.bool,

    handleSubmit: PropTypes.func,
    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    confirmEmail: PropTypes.func,
    handleValidateField: PropTypes.func,
    signUp: PropTypes.func,
    onChangeUserName: PropTypes.func,
    onChangePassword: PropTypes.func,
};

export default validationForm(SignUpForm);
