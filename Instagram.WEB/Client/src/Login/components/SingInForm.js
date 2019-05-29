import React from 'react';
import { Link } from 'react-router-dom';

export default class SignInForm extends React.Component {

    state = {
        email: '',
        password: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn({
            email: '123@gmail.com',
            password: 'Wtest100*',
        });
    }

    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5">
                            <div className="box is-centered">
                                <h1 className="is-size-3 has-text-centered">Instagram</h1>
                                <form onSubmit={this.handleSubmit} className="margin-top-two" >
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="email" placeholder="Email" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="password" placeholder="Password" />
                                        </div>
                                    </div>
                                    <button className="button is-half">Log In</button>
                                </form>
                            </div>
                            <div className="box is-centered">
                                <p>Don't have an account? <Link to="/account/register">Sign up</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
