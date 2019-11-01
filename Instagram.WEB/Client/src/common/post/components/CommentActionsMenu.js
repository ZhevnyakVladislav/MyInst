import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Menu from 'react-bulma-components/lib/components/menu';

const CommentActionsMenu = ({
    onDeleteComment,
    onClose
}) => {
    return (
        <Container>
            <Columns centered>
                <Columns.Column className="has-background-white has-border-radius">
                    <Menu>
                        <Menu.List>
                            <Menu.List.Item className="has-text-centered" onClick={onDeleteComment}>Delete</Menu.List.Item>
                            <Menu.List.Item className="has-text-centered" onClick={onClose}>Cancel</Menu.List.Item>
                        </Menu.List>
                    </Menu>
                </Columns.Column>
            </Columns>
        </Container>
    );
};

CommentActionsMenu.propTypes = {
    onDeleteComment: PropTypes.func,
    onClose: PropTypes.func
};

export default CommentActionsMenu;