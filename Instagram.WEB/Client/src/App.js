import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RequireAuth from './common/auth/RequireAuth';
import SignIn from './Login/containers/SingInForm';
import SignUpForm from './common/SignUpForm/containers/SingUpForm';

const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/account/login" component={SignIn} />
                <Route path="/account/register" component={SignUpForm} />
                <Route path="*" component={RequireAuth(() => <h1>Hello world</h1>)} />
            </Switch>
        </div>);
};

export default App;
