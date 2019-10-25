import React from 'react';
import validationForm from '../../common/validation/ValidationForm';
import Joi from 'joi';
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
import TextField from '../../common/inputs/TextInput';

class SignInForm extends React.PureComponent {
    state = {
        userName: '',
        password: '',
    }

    handleSubmit = (data) => {
        this.props.signIn(data);
    }

    handleChange = (field) => e => {
        this.setState({
            [field]: e.target.value
        }, () => this.props.handleValidateField(field));
    }

    getValidationSchema = () => ({
        userName: Joi.string().required().label('User name'),
        password: Joi.string().required().min(8).label('Password'),
    })

    getValidationData = () => this.state;

    render() {
        const { renderErrors, isFieldValid, isBusy, handleSubmit } = this.props;
        const { userName, password } = this.state;

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
                                <form onSubmit={handleSubmit} className="margin-top-two" >
                                    <TextField
                                        name="userName"
                                        type="text"
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
                                            <Button
                                                className="is-full-width"
                                                color="primary"
                                                onClick={handleSubmit}
                                                loading={isBusy}
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
    }
}

SignInForm.propTypes = {
    isBusy: PropTypes.bool,

    renderErrors: PropTypes.func,
    isFieldValid: PropTypes.func,
    signIn: PropTypes.func,
    handleValidateField: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default validationForm(SignInForm);

