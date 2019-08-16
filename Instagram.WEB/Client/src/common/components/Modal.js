import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bulma-components/lib/components/modal';

const Popup = (WrappedComponent) => {

    class CustomModal extends React.PureComponent {
        constructor(props) {
            super(props);

            this.wrappedComponentInstanceRef = React.createRef();
        }

        render() {
            const { isOpen, onClose, closeOnBlur } = this.props;
            const title = this.wrappedComponentInstanceRef.current && this.wrappedComponentInstanceRef.current.getTitle && this.wrappedComponentInstanceRef.current.getTitle();
            return (
                <Modal show={isOpen} onClose={onClose} closeOnBlur={closeOnBlur}>
                    <Modal.Card>
                        {title &&
                            <Modal.Card.Head onClose={onClose}>
                                <Modal.Card.Title className="has-text-centered">{title}</Modal.Card.Title>
                            </Modal.Card.Head>
                        }
                        <Modal.Card.Body>
                            <WrappedComponent {...this.props} ref={this.wrappedComponentInstanceRef} />
                        </Modal.Card.Body>
                    </Modal.Card>

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

        onClose: PropTypes.func
    };

    return CustomModal;
};

export default Popup;