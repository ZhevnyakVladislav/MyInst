import React from 'react';
import PropTypes from 'prop-types';
import Menu from 'react-bulma-components/lib/components/menu';
import modal from '../../common/components/Modal';

const SettingsModal = ({ onClose, onLogout }) => {
    return (
        <Menu>
            <Menu.List>
                <Menu.List.Item className="has-text-centered" onClick={onLogout}>Log Out</Menu.List.Item>
                <Menu.List.Item className="has-text-centered" onClick={onClose}>Cancel</Menu.List.Item>
            </Menu.List>
        </Menu>
    );
};


SettingsModal.propTypes = {
    isOpen: PropTypes.bool,

    onClose: PropTypes.func,
    onLogout: PropTypes.func,
};

export default modal(SettingsModal);