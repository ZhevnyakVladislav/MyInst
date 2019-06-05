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
            return <ComposedComponent {...this.props} />;
        }
    }

    Authenticate.propsTypes = {
        isUserAuth: PropTypes.bool.isRequired,
    };

    return connect(state => ({ isUserAuth: state.user.isUserAuth }))(Authenticate);
}


