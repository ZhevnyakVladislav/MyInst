import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        state = {}

        static getDerivedStateFromProps(props) {
            if (!props.isUserAuth) {
                props.history.push('/account/login');
            }

            return null;
        }
        render() {
            return (this.props.isUserAuth ? <ComposedComponent {...this.props} /> : null);
        }
    }

    Authenticate.propTypes = {
        isUserAuth: PropTypes.bool,
        history: PropTypes.object,
    };

    const mapStateToProps = (state) => ({
        isUserAuth: state.user.isUserAuth,
    });

    const mapDispatchToProps = {
    };

    return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}


