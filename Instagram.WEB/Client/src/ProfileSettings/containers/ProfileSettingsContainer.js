import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Columns from 'react-bulma-components/lib/components/columns';
import Tabs from 'react-bulma-components/lib/components/tabs';
import Box from 'react-bulma-components/lib/components/box';
import { Route } from 'react-router-dom';

import AvatarFormContainer from './AvatarFormContainer';
import EditProfileTabContainer from './EditProfileTabContainer';
import ChangePasswordTabContainer from './ChangePasswordTabContainer';
import PrivacyAndSecurityTabContainer from './PrivacyAndSecurityTabContainer';

const basePath = '/profile';

const MenuItemIds = {
    EditProfile: 1,
    ChangePassword: 2,
    PrivacyAndSecurity: 3
};

const MenuItemNames = {
    [MenuItemIds.EditProfile]: 'Edit Profile',
    [MenuItemIds.ChangePassword]: 'ChangePassword',
    [MenuItemIds.PrivacyAndSecurity]: 'Privacy and Security'
};

const MenuItemComponents = {
    [MenuItemIds.EditProfile]: EditProfileTabContainer,
    [MenuItemIds.ChangePassword]: ChangePasswordTabContainer,
    [MenuItemIds.PrivacyAndSecurity]: PrivacyAndSecurityTabContainer
};

const MenuItemPaths = {
    [MenuItemIds.EditProfile]: `${basePath}/edit`,
    [MenuItemIds.ChangePassword]: `${basePath}/password/change`,
    [MenuItemIds.PrivacyAndSecurity]: `${basePath}/privacy_and_security`,

};

const componentsWithAvatar = [MenuItemIds.ChangePassword, MenuItemIds.EditProfile];

class ProfileSettingsContainer extends React.PureComponent {
    state = {
        activeTab: +Object.keys(MenuItemPaths).find(key => MenuItemPaths[key] === this.props.location.pathname)
    };

    handleTabChange = (e) => {
        const activeTab = +e.target.getAttribute('tab-id');
        this.setState({ activeTab: activeTab }, () =>
            this.props.history.push(MenuItemPaths[activeTab])
        );
    }

    render() {
        const { activeTab } = this.state;
        return (
            <Columns centered>
                <Columns.Column size={10}>
                    <Box className="is-paddingless">
                        <Columns className="is-marginless">
                            <Columns.Column className="is-paddingless" size={3} >
                                <Tabs fullwidth>
                                    {Object.keys(MenuItemIds).map((key) =>
                                        <Tabs.Tab key={MenuItemIds[key]} tab-id={MenuItemIds[key]}
                                            active={MenuItemIds[key] === activeTab}
                                            onClick={this.handleTabChange}
                                        >
                                            {MenuItemNames[MenuItemIds[key]]}
                                        </Tabs.Tab>)}
                                </Tabs>
                            </Columns.Column>
                            <Columns.Column style={{ borderLeft: 'solid 1px #dddddd' }} size={9}>
                                {componentsWithAvatar.includes(this.state.activeTab) && <AvatarFormContainer isShowChange={this.state.activeTab === MenuItemIds.EditProfile} />}
                                <Route path={MenuItemPaths[activeTab]} component={MenuItemComponents[activeTab]} />
                            </Columns.Column>
                        </Columns>
                    </Box>
                </Columns.Column>
            </Columns>
        );
    }

}
ProfileSettingsContainer.propTypes = {
    history: PropTypes.object,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsContainer); 