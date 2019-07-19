import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notification from 'react-bulma-components/lib/components/notification';
import Button from 'react-bulma-components/lib/components/button';
import { hideAlert } from '../../store/alert/actions';

class ErrorNotification extends React.PureComponent {

    startCounter = () => {
        setTimeout(this.props.hideAlert, 3000);
    }

    render() {
        const { isShow, message, hideAlert } = this.props;
        isShow && this.startCounter();
        return (
            <Notification color="danger" className={isShow ? 'show' : ''}>
                {message}
                <Button remove onClick={hideAlert} />
            </Notification>
        );
    }
}

ErrorNotification.propTypes = {
    isShow: PropTypes.bool,
    message: PropTypes.string,

    hideAlert: PropTypes.func
};

const mapStateToProps = state => ({
    isShow: state.alert.isShow,
    message: state.alert.message,
});

const mapDispatchToProps = ({
    hideAlert
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification);
