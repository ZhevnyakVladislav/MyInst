import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import { Link } from 'react-router-dom';
import { UsersModalTitleByType } from '../constants';
import Media from 'react-bulma-components/lib/components/media';
import Button from 'react-bulma-components/lib/components/button';
import Modal from 'react-bulma-components/lib/components/modal';
import ContentLoader from '../../loaders/ContentLoader';
import Loader from 'react-bulma-components/lib/components/loader';
import DetailPostLoader from '../../loaders/DetailPostLoader';

const UsersList = ({
    modalType,
    data,
    loadData,
    onClose,
    currentUserName,
    onUnfollowModalOpen,
    onFollow,
    isLoading
}) => {
    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleChangeFollow = useCallback(
        (profile) => () => {
            profile.isFollowing
                ? onUnfollowModalOpen({
                    userName: profile.userName,
                    imageUrl: profile.imageUrl
                })
                : onFollow({ userName: profile.userName });
        },
        [onFollow, onUnfollowModalOpen]
    );

    return (
        <Container>
            <ContentLoader
                isReady={!!data.length}
                isLoading={isLoading}
                loaderContent={<DetailPostLoader />}
            >
                <Modal.Card>
                    <Modal.Card.Head onClose={onClose}>
                        <Modal.Card.Title className="has-text-centered">{UsersModalTitleByType[modalType]}</Modal.Card.Title>
                    </Modal.Card.Head>
                    <Modal.Card.Body>
                        <ul>
                            {data.map((profile) => {
                                return <li key={profile.userName}>
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
                                                        onClick={handleChangeFollow(profile)}
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
                    </Modal.Card.Body>
                </Modal.Card>
            </ContentLoader>
        </Container >
    );
};

UsersList.propTypes = {
    modalType: PropTypes.number,
    data: PropTypes.array,
    currentUserName: PropTypes.string,
    isLoading: PropTypes.bool,

    loadData: PropTypes.func,
    onClose: PropTypes.func,
    onUnfollowModalOpen: PropTypes.func,
    onFollow: PropTypes.func,
};


export default React.memo(UsersList);




