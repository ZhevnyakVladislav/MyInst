import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RequireAuth from './common/components/auth/RequireAuth';
import SingInFormContainer from './Login/containers/SingInFormContainer';
import SingUpFormContainer from './common/SignUpForm/containers/SingUpFormContainer';
import Header from './Header/containers/HeaderContainer';
import Profile from './Profile/containers/ProfileContainer';
import NotFoundPage from './common/components/notFound/NotFoundPage';

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
                <Route path="/account/login" component={SingInFormContainer} />
                <Route path="/account/register" component={SingUpFormContainer} />
                <Route path="/notFound" component={RequireAuth((props) => withHeader(NotFoundPage, props))} />
                <Route path="/:username" component={RequireAuth((props) => withHeader(Profile, props))} />
            </Switch>
        </div>);
};

export default App;
