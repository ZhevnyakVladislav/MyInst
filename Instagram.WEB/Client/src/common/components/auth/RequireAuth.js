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
            return (this.props.isUserAuth && <ComposedComponent {...this.props} />);
        }
    }

    Authenticate.propTypes = {
        isUserAuth: PropTypes.bool,
        history: PropTypes.object,
        // userId: PropTypes.number,

        // getUserData: PropTypes.func
    };

    const mapStateToProps = (state) => ({
        isUserAuth: state.user.isUserAuth,
        // userId: state.user.id,
    });

    const mapDispatchToProps = {
        // getUserData: () => dispatch(getUserData())
    };

    return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}


