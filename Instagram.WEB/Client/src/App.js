import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RequireAuth from './common/auth/RequireAuth';
import SingInFormContainer from './Login/containers/SingInFormContainer';
import SingUpFormContainer from './Login/containers/SingUpFormContainer';
import ResetPasswordFormContainer from './Login/containers/ResetPasswordFormContainer';
import Header from './Header/containers/HeaderContainer';
import NotFoundPage from './common/notFound/NotFoundPage';
import ErrorNotification from './common/apiErrorHandling/ErrorNotification';
import HomePage from './Home/components/HomePage';
import ProfilePage from './Profile/components/ProfilePage';
import ProfileSettingsPage from './ProfileSettings/components/ProfileSettingsPage';
import PostPage from './Post/components/PostPage';

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
                <Route path="/users/:username" component={RequireAuth((props) => withHeader(ProfilePage, props))} />
                <Route path="/posts/:id" component={RequireAuth((props) => withHeader(PostPage, props))} />
                <Route exact path="/profile/:tabId" component={RequireAuth((props) => withHeader(ProfileSettingsPage, props))} />
                <Route path="/" exact component={RequireAuth((props) => withHeader(HomePage, props))} />
                <Route component={RequireAuth((props) => withHeader(NotFoundPage, props))} />
            </Switch>
            <ErrorNotification />
        </>
    );
};

export default App;
