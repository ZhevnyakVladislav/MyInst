import PropTypes from 'prop-types';

const ContentLoader = ({
    isLoading,
    isReady,
    loaderContent,
    children
}) => {
    return (
        (!isReady || isLoading) ? loaderContent : children
    );
};

ContentLoader.propTypes = {
    isLoading: PropTypes.bool,
    isReady: PropTypes.bool
};

ContentLoader.defaultProps = {
    isReady: true
};

export default ContentLoader;