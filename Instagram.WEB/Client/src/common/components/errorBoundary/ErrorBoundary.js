import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any
};

export default ErrorBoundary;