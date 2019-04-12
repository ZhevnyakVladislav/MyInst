import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from './Login/containers/SingInForm';
import SignUpForm from './common/SignUpForm/containers/SingUpForm';

const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/account/login" component={SignIn} />
                <Route path="/account/register" component={SignUpForm} />
                <Route path="*" component={() => (<h1>Not Found</h1>)} />
            </Switch>
        </div>);
};

export default App;
