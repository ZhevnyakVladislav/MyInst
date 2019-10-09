import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bulma-components/lib/components/modal';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';

const Popup = (WrappedComponent) => {
    class CustomModal extends React.PureComponent {
        constructor(props) {
            super(props);

            this.wrappedComponentInstanceRef = React.createRef();
        }

        render() {
            const { isOpen, onClose, closeOnBlur } = this.props;
            return (
                <Modal show={isOpen} onClose={onClose} closeOnBlur={closeOnBlur}>
                    <Modal.Content className="has-background-white" >
                        {/* <Container fluid> */}
                        {/* <Section size="large"> */}
                        {/* <Columns className="is-full-width" centered> */}
                        {/* <Columns.Column size={size}> */}
                        {/* <Section className="is-paddingless" style={{ maxHeight: '600px' }}> */}
                        {/* <Columns centered> */}
                        {/* <Columns.Column className="has-background-white" size={size}> */}
                        <div>
                            <WrappedComponent {...this.props} ref={this.wrappedComponentInstanceRef} />
                        </div>
                        {/* </Columns.Column> */}
                        {/* </Columns> */}
                        {/* </Section> */}
                        {/* </Columns.Column> */}
                        {/* </Columns> */}
                        {/* </Section> */}
                        {/* </Container> */}
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