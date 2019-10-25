import React from 'react';
import PropTypes from 'prop-types';
import Menu from 'react-bulma-components/lib/components/menu';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import { Link } from 'react-router-dom';

const SettingsModal = ({
    onClose,
    onLogout
}) => {
    return (
        <Container>
            <Columns centered>
                <Columns.Column className="has-background-white has-border-radius">
                    <Menu>
                        <Menu.List>
                            <Menu.List.Item onClick={onLogout}>
                                <Link className="has-text-centered" to="/profile/change_password">Change Password</Link>
                            </Menu.List.Item>
                            <Menu.List.Item onClick={onLogout}>
                                <Link className="has-text-centered" to="/profile/privacy_and_security">Privacy and Security</Link>
                            </Menu.List.Item>
                            <Menu.List.Item className="has-text-centered" onClick={onLogout}>Log Out</Menu.List.Item>
                            <Menu.List.Item className="has-text-centered" onClick={onClose}>Cancel</Menu.List.Item>
                        </Menu.List>
                    </Menu>
                </Columns.Column>
            </Columns>
        </Container>
    );
};


SettingsModal.propTypes = {
    isOpen: PropTypes.bool,

    onClose: PropTypes.func,
    onLogout: PropTypes.func,
};

export default SettingsModal;