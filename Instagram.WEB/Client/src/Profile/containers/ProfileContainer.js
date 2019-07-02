import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Section from 'react-bulma-components/lib/components/section';
import ProfileLayout from '../components/ProfileLayout';
import { loadProfileData } from '../../store/profile/actions';
import { logOut } from '../../store/user/actions';
import SettingsModal from '../components/SettingsModal';

class ProfileContainer extends React.PureComponent {
    state = {
        isSettingModalOpen: false
    }

    static getDerivedStateFromProps(props) {
        if (props.profileData.error) {
            props.history.push('/notFound');
        }
        return null;
    }

    componentDidMount() {
        this.props.loadProfileData(this.props.match.params.username);
    }

    handleOpenSettingsModal = () => {
        this.setState({ isSettingModalOpen: true });
    }

    handleCloseSettingsModal = () => {
        this.setState({ isSettingModalOpen: false });
    }

    handleLogout = () => {
        this.props.logOut();
        this.handleCloseSettingsModal();
    }

    render() {
        const { profileData, isUserAuth } = this.props;
        const { isSettingModalOpen } = this.state;
        return (
            <Section className="has-padding-top-80">
                <ProfileLayout
                    openSettingsModal={this.handleOpenSettingsModal}
                    isUserAuth={isUserAuth}
                    profileData={profileData} />
                <SettingsModal
                    isOpen={isSettingModalOpen}
                    onClose={this.handleCloseSettingsModal}
                    onLogout={this.handleLogout}
                />
            </Section>
        );
    }
}

ProfileContainer.propTypes = {
    match: PropTypes.object,
    profileData: PropTypes.object,
    isUserAuth: PropTypes.bool,
    error: PropTypes.object,
    history: PropTypes.object,

    loadProfileData: PropTypes.func,
    logOut: PropTypes.func,
};

const mapStateToProps = (state) => ({
    isUserAuth: state.user.isUserAuth,
    profileData: state.profile
});

const mapDispatchToProps = ({
    loadProfileData: loadProfileData,
    logOut: logOut
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer); 
