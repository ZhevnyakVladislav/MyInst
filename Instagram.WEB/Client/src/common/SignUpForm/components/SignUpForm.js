import React from 'react';
import { Link } from 'react-router-dom';
import validationForm from '../../../common/validation/ValidationForm';
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
import Joi from 'joi';
import TextField from '../../../common/components/TextField';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        email: '',
        password: '',
        fullName: '',
        userName: '',
    };

    handleSubmit = () => {
        this.props.signUp(this.state);
    }

    handleChange = (field) => e => {
        this.setState({
            [field]: e.target.value
        }, () => this.props.handleValidateField(field));
    }

    getValidationSchema = () => {
        return {
            email: Joi.string().required().email().label('Email'),
            password: Joi.string().required().min(8).label('Password'),
            fullName: Joi.string().required().label('Full name'),
            userName: Joi.string().required().label('User name'),
        };
    }

    getValidationData = () => {
        return this.state;
    }

    render() {
        const { email, password, fullName, userName } = this.state;
        const { handleSubmit, renderErrors, isFieldValid } = this.props;
        return (
            <Section>
                <Container>
                    <Columns>
                        <Columns.Column size={5} offset="one-quarter">
                            <Box>
                                <Heading className="has-text-centered">Instagram</Heading>
                                <p className="has-text-centered">Sign up to see photos and videos from your friends</p>
                                {this.props.errorMessage &&
                                    <Message color="danger">
                                        <Message.Body>
                                            {this.props.errorMessage}
                                        </Message.Body>
                                    </Message>}
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
                                        handleChange={this.handleChange}
                                        renderErrors={renderErrors}
                                    />
                                    <TextField
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        isFieldValid={isFieldValid}
                                        handleChange={this.handleChange}
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
    }
}

SignUpForm.propTypes = {
    signUp: PropTypes.func,
    handleSubmit: PropTypes.func,
    getErrorMessage: PropTypes.func,
    renderErrors: PropTypes.func,
    handleValidateField: PropTypes.func,
    isFieldValid: PropTypes.func,
    errorMessage: PropTypes.string
};

export default validationForm(SignUpForm);
