import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Menu from 'react-bulma-components/lib/components/menu';
import { useLocation } from 'react-router-dom';

const PostActionsMenu = ({
    onRedirect,
    onUnfollow,
    onClose
}) => {
    const {pathname} = useLocation();
    const isGoToPostVisible = !pathname.includes('/posts/');
    return (
        <Container>
            <Columns centered>
                <Columns.Column className="has-background-white has-border-radius">
                    <Menu>
                        <Menu.List>
                            {isGoToPostVisible && <Menu.List.Item className="has-text-centered" onClick={onRedirect}>Go To Post</Menu.List.Item>}
                            <Menu.List.Item className="has-text-centered" onClick={onUnfollow}>Unfollow</Menu.List.Item>
                            <Menu.List.Item className="has-text-centered" onClick={onClose}>Cancel</Menu.List.Item>
                        </Menu.List>
                    </Menu>
                </Columns.Column>
            </Columns>
        </Container>
    );
};

PostActionsMenu.propTypes = {
    onRedirect: PropTypes.func,
    onUnfollow: PropTypes.func,
    onClose: PropTypes.func
};

export default PostActionsMenu;