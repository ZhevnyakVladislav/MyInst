import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Tabs from 'react-bulma-components/lib/components/tabs';
import Box from 'react-bulma-components/lib/components/box';
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    Redirect,
    useParams,
} from 'react-router-dom';

import AvatarFormContainer from '../containers/AvatarFormContainer';
import EditProfileTabContainer from '../containers/EditProfileTabContainer';
import ChangePasswordTabContainer from '../containers/ChangePasswordTabContainer';
import PrivacyAndSecurityTabContainer from '../containers/PrivacyAndSecurityTabContainer';

const MenuItemPaths = {
    EditProfile: 'edit',
    ChangePassword: 'change_password',
    PrivacyAndSecurity: 'privacy_and_security',
};

const MenuItemNames = {
    [MenuItemPaths.EditProfile]: 'Edit Profile',
    [MenuItemPaths.ChangePassword]: 'Change Password',
    [MenuItemPaths.PrivacyAndSecurity]: 'Privacy and Security'
};

const MenuItemComponentsByPath = {
    [MenuItemPaths.EditProfile]: EditProfileTabContainer,
    [MenuItemPaths.ChangePassword]: ChangePasswordTabContainer,
    [MenuItemPaths.PrivacyAndSecurity]: PrivacyAndSecurityTabContainer
};

const componentsWithAvatar = [MenuItemPaths.EditProfile, MenuItemPaths.ChangePassword];
const RedirectComponent = () => <Redirect to="/profile/edit" />;

const ProfileSettingsPage = () => {
    const { url } = useRouteMatch();
    const { tabId } = useParams();
    const Component = MenuItemComponentsByPath[tabId] || RedirectComponent;

    return (
        <Container className="has-padding-top-100">
            <Columns centered>
                <Columns.Column size={10}>
                    <Box className="is-paddingless">
                        <Columns className="is-marginless">
                            <Columns.Column className="is-paddingless" size={3} >
                                <Tabs fullwidth>
                                    {Object.keys(MenuItemPaths).map((key) => {
                                        const id = MenuItemPaths[key];
                                        return (
                                            <Tabs.Tab
                                                key={id}
                                                tab-id={id}
                                                active={id === tabId}
                                                renderAs="div"
                                            >
                                                <Link to={`/profile/${id}`} tab-id={id}>
                                                    {MenuItemNames[id]}
                                                </Link>
                                            </Tabs.Tab>
                                        );
                                    })}
                                </Tabs>
                            </Columns.Column>
                            <Columns.Column style={{ borderLeft: 'solid 1px #dddddd' }} size={9}>
                                {componentsWithAvatar.includes(tabId) && <AvatarFormContainer isShowChange={tabId === MenuItemPaths.EditProfile} />}
                                <Switch>
                                    <Route exact path={url} component={Component} />
                                </Switch>
                            </Columns.Column>
                        </Columns>
                    </Box>
                </Columns.Column>
            </Columns>
        </Container>
    );
};

export default React.memo(ProfileSettingsPage);