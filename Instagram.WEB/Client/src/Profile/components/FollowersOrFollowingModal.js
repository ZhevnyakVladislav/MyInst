import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import modal from '../../common/components/Modal';
import Media from 'react-bulma-components/lib/components/media';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import {
    loadFollowers,
    loadFollowing,
    follow,
    openUnfollowModal
} from '../../store/profile/actions';
import { Link } from 'react-router-dom';

export const MODE = {
    followers: 1,
    following: 2
};

const TitleByMode = {
    [MODE.followers]: 'Followers',
    [MODE.following]: 'Following',
};

class FollowersOrFollowingModal extends React.PureComponent {
    componentDidMount() {
        const { mode, viewedUserName } = this.props;
        mode === MODE.followers
            ? this.props.loadFollowers(viewedUserName)
            : this.props.loadFollowing(viewedUserName);
    }

    handleChangeFollowing = profileData => () => {
        profileData.isFollowing
            ? this.props.openUnfollowModal(profileData)
            : this.props.follow({ userName: profileData.userName });
    }

    getTitle = () => {
        return TitleByMode[this.props.mode];
    }

    render() {
        const { mode, currentUserName } = this.props;
        const data = mode === MODE.followers ? this.props.followers : this.props.following;

        return (
            <ul>
                {data.map((profile, i) => {
                    return <li key={profile.userName + i}>
                        <Columns gapless>
                            <Columns.Column size={2}>
                                <Media.Item>
                                    <Link to={`/users/${profile.userName}`}>
                                        <figure className="image is-32x32">
                                            <img className="is-rounded avatar" src={profile.imageUrl} />
                                        </figure>
                                    </Link>
                                </Media.Item>
                            </Columns.Column>
                            <Columns.Column size={7}>
                                <Media.Item>
                                    <Link to={`/users/${profile.userName}`}>
                                        <h2>{profile.userName}</h2>
                                        <p>{profile.bio}</p>
                                    </Link>
                                </Media.Item>
                            </Columns.Column>
                            {profile.userName !== currentUserName &&
                                <Columns.Column size={3}>
                                    <Media.Item>
                                        <Button
                                            color={profile.isFollowing ? '' : 'primary'}
                                            className="has-max-width-100 has-margin-left-10"
                                            renderAs="a"
                                            onClick={this.handleChangeFollowing(profile)}
                                        >
                                            {profile.isFollowing ? 'Following' : 'Follow'}
                                        </Button>
                                    </Media.Item>
                                </Columns.Column>
                            }
                        </Columns>
                    </li>;
                })}
            </ul>
        );
    }
}

FollowersOrFollowingModal.propTypes = {
    isOpen: PropTypes.bool,
    mode: PropTypes.number,
    followers: PropTypes.array,
    following: PropTypes.array,
    viewedUserName: PropTypes.string,
    currentUserName: PropTypes.string,

    onClose: PropTypes.func,
    loadFollowers: PropTypes.func,
    loadFollowing: PropTypes.func,
    follow: PropTypes.func,
    openUnfollowModal: PropTypes.func,
};

const mapStateToProps = (state) => ({
    viewedUserName: state.profile.viewData.userName,
    currentUserName: state.user.userName,
    followers: state.profile.followers,
    following: state.profile.following,
});

const mapDispatchToProps = ({
    follow,
    loadFollowers,
    loadFollowing,
    openUnfollowModal
});


export default connect(mapStateToProps, mapDispatchToProps)(modal(FollowersOrFollowingModal));