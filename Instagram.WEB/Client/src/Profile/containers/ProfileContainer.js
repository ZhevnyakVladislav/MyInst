import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Section from 'react-bulma-components/lib/components/section';
import ProfileLayout from '../components/ProfileLayout';
import { loadProfileData } from '../../store/profile/actions';

class ProfileContainer extends React.PureComponent {

    componentDidMount() {

        this.props.loadProfileData(this.props.match.params.username);
    }

    render() {
        const { profileData } = this.props;
        return (
            <Section className="has-margin-top-60">
                <ProfileLayout profileData={profileData} />
            </Section>
        );
    }
}

ProfileContainer.propTypes = {
    loadProfileData: PropTypes.func,
    match: PropTypes.object,
    profileData: PropTypes.object,
};

const mapStateToProps = (state) => ({
    isUserAuth: state.user.isUserAuth,
    profileData: state.profile
});

const mapDispatchToProps = ({
    loadProfileData: loadProfileData
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer); 
