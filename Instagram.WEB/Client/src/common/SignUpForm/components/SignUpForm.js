import React from 'react';
import { Link } from 'react-router-dom';

export default class SignUpForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp({
            email: '123@gmail.com',
            password: 'Wtest100*',
            confirmPassword: 'Wtest100*'
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
                                <p>Sign up to see photos and videos from your friends</p>
                                <form onSubmit={this.handleSubmit} className="margin-top-two" >
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="email" placeholder="Email" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Full Name" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Username" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="password" placeholder="Password" />
                                        </div>
                                    </div>
                                    <button onClick={this.handleSubmit} className="button is-half">Sign up</button>
                                </form>
                                <p>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</p>
                            </div>
                            <div className="box is-centered">
                                <p>Have an account? <Link to="/account/login">Log in</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
