import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm';
import VerificationForm from '../components/VerificationForm';
import { signUp, confirmEmail } from '../../store/user/actions';

const SignUpFormContainer = ({
    isUserAuth,
    signUp,
    confirmEmail,
    isBusy,
    isShowVerification,
}) => {

    const [userName, changeUserName] = useState('');
    const [password, changePassword] = useState('');

    const handleChangeUserName = useCallback(
        () => e => changeUserName(e.target.value),
        [changeUserName]
    );
    const handleChangePassword = useCallback(
        () => e => changePassword(e.target.value),
        [changePassword]
    );

    if (isUserAuth) {
        return <Redirect to='/' />;
    } else {
        return isShowVerification
            ? <VerificationForm
                userName={userName}
                password={password}
                confirmEmail={confirmEmail}
                isBusy={isBusy}
            />
            : <SignUpForm
                userName={userName}
                password={password}
                onChangeUserName={handleChangeUserName}
                onChangePassword={handleChangePassword}
                isBusy={isBusy}
                signUp={signUp}
            />;
    }
};

SignUpFormContainer.propTypes = {
    isUserAuth: PropTypes.bool,
    isBusy: PropTypes.bool,

    signUp: PropTypes.func,
    confirmEmail: PropTypes.func,
};

const mapStateToProps = (state) => ({
    isUserAuth: state.user.isUserAuth,
    isShowVerification: state.user.isShowVerification,
    isBusy: state.user.isBusy,
    userName: state.user.data.userName
});

const mapDispatchToProps = ({
    signUp: signUp,
    confirmEmail: confirmEmail
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormContainer);