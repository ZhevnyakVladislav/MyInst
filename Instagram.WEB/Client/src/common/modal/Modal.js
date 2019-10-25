import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bulma-components/lib/components/modal';

const Popup = (WrappedComponent, contentStyles) => {
    const CustomModal = (props) => {

        const { isOpen, onClose, closeOnBlur } = props;

        return (
            <Modal show={isOpen} onClose={onClose} closeOnBlur={closeOnBlur}>
                <Modal.Content style={contentStyles}>
                    <WrappedComponent {...props} />
                </Modal.Content>
            </Modal>
        );
    };

    CustomModal.defaultProps = {
        closeOnBlur: true
    };

    CustomModal.propTypes = {
        isOpen: PropTypes.bool,
        closeOnBlur: PropTypes.bool,
        title: PropTypes.string,
        size: PropTypes.number,

        onClose: PropTypes.func
    };

    return CustomModal;
};

export default Popup;