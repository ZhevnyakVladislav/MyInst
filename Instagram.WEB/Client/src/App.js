import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RequireAuth from './common/components/auth/RequireAuth';
import SingInFormContainer from './Login/containers/SingInFormContainer';
import SingUpFormContainer from './common/SignUpForm/containers/SingUpFormContainer';
import ResetPasswordFormContainer from './common/ResetPasswordForm/containers/ResetPasswordFormContainer';
import Header from './Header/containers/HeaderContainer';
import Profile from './Profile/containers/ProfileContainer';
import NotFoundPage from './common/components/notFound/NotFoundPage';
import ProfileSettingsContainer from './Profile/containers/ProfileSettingsContainer';
import ErrorNotification from './common/apiErrorHandling/ErrorNotification';

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
        <>
            <Switch>
                <Route path="/account/login" component={SingInFormContainer} />
                <Route path="/account/register" component={SingUpFormContainer} />
                <Route path="/account/password/reset" component={ResetPasswordFormContainer} />
                <Route path="/users/:username" component={RequireAuth((props) => withHeader(Profile, props))} />
                <Route path="/profile" component={RequireAuth((props) => withHeader(ProfileSettingsContainer, props))} />
                <Route path="*" component={RequireAuth((props) => withHeader(NotFoundPage, props))} />
            </Switch>
            <ErrorNotification />
        </>
    );
};

export default App;
