import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserData } from '../../../store/user/actions';

export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        state = {}

        static getDerivedStateFromProps(props) {
            if (!props.isUserAuth) {
                props.history.push('/account/login');
            }

            return null;
        }

        componentDidMount() {
            if (!this.props.userId) {
                this.props.getUserData();
            }
        }

        componentDidUpdate() {
            if (!this.props.isUserAuth) {
                this.props.history.push('/account/login');
            }
        }

        render() {
            return (this.props.userId && <ComposedComponent {...this.props} />);
        }
    }

    Authenticate.propTypes = {
        isUserAuth: PropTypes.bool,
        history: PropTypes.object,
        userId: PropTypes.number,

        getUserData: PropTypes.func
    };

    const mapStateToProps = (state) => ({
        isUserAuth: state.user.isUserAuth,
        userId: state.user.id,
    });

    const mapDispatchToProps = (dispatch) => ({
        getUserData: () => dispatch(getUserData())
    });

    return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}


