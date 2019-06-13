import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bulma-components/lib/components/modal';
import Menu from 'react-bulma-components/lib/components/menu';
import Section from 'react-bulma-components/lib/components/section';
import Box from 'react-bulma-components/lib/components/box';

const SettingsModal = ({ isOpen, onClose, onLogout }) => {

    return (
        <Modal show={isOpen} onClose={onClose} closeOnBlur showClose={false}>
            <Modal.Content>
                <Section>
                    <Box>
                        <Menu>
                            <Menu.List>
                                <Menu.List.Item className="has-text-centered" onClick={onLogout}>Log Out</Menu.List.Item>
                                <Menu.List.Item className="has-text-centered" onClick={onClose}>Cancel</Menu.List.Item>
                            </Menu.List>
                        </Menu>
                    </Box>
                </Section>
            </Modal.Content>
        </Modal>
    );
};

SettingsModal.propTypes = {
    isOpen: PropTypes.bool,

    onClose: PropTypes.func,
    onLogout: PropTypes.func,
};

export default SettingsModal;