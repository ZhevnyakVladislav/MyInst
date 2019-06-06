import React from 'react';
import { Link } from 'react-router-dom';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import validationForm from '../../common/components/validation/ValidationForm';
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
import Joi from 'joi';
import TextField from '../../common/components/TextField';

class SignInForm extends React.Component {

    state = {
        email: '',
        password: '',
    }

    static getDerivedStateFromProps(props) {
        if (props.isUserAuth) {
            props.history.push('/');
        }
        return null;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
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
        };
    }

    getValidationData = () => {
        return this.state;
    }

    render() {
        const { email, password } = this.state;
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
                            </Box>
                            <Box>
                                <p>Don't have an account? <Link to="/account/register">Sign up</Link></p>
                            </Box>
                        </Columns.Column>
                    </Columns>
                </Container>
            </Section>
        );
    }
}

SignInForm.propTypes = {
    signIn: PropTypes.func,
    handleSubmit: PropTypes.func,
    getErrorMessage: PropTypes.func,
    renderErrors: PropTypes.func,
    handleValidateField: PropTypes.func,
    isFieldValid: PropTypes.func,
    errorMessage: PropTypes.string,
    isUserAuth: PropTypes.bool,
    history: PropTypes.object
};

export default validationForm(SignInForm);

