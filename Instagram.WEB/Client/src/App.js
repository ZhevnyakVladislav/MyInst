import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RequireAuth from './common/components/auth/RequireAuth';
import SignIn from './Login/containers/SingInForm';
import SignUpForm from './common/SignUpForm/containers/SingUpForm';
import Header from './Header/containers/HeaderContainer';
import Profile from './Profile/containers/ProfileContainer';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';

const withHeader = (ComposedComponent, props) =>
    (
        <>
            <Header />
            <ComposedComponent {...props} />
        </>
    );


const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/account/login" component={SignIn} />
                <Route path="/account/register" component={SignUpForm} />
                <Route path="/:username" render={(props) => withHeader(Profile, props)} />
            </Switch>
        </div>);
};

export default App;
