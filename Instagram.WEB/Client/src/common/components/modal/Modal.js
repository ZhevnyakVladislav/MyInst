import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bulma-components/lib/components/modal';

const Popup = (WrappedComponent, contentStyles) => {
    class CustomModal extends React.PureComponent {
        constructor(props) {
            super(props);

            this.wrappedComponentInstanceRef = React.createRef();
        }

        render() {
            const { isOpen, onClose, closeOnBlur } = this.props;
            return (
                <Modal show={isOpen} onClose={onClose} closeOnBlur={closeOnBlur}>
                    <Modal.Content style={contentStyles}>
                        <WrappedComponent {...this.props} ref={this.wrappedComponentInstanceRef} />
                    </Modal.Content>
                </Modal>
            );
        }
    }

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