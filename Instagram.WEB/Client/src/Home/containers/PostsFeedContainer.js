import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PropsFeed from '../components/PostsFeed';
import { openModal } from '../../store/postActionsModal/actions';

const PostsFeedContainer = ({
    data,
    openPostActionMenu
}) => {
    return (
        <PropsFeed
            openPostActionMenu={openPostActionMenu}
        />
    );
};

PostsFeedContainer.propTypes = {
    openPostActionMenu: PropTypes.func
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = ({
    openPostActionMenu: openModal
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsFeedContainer);
