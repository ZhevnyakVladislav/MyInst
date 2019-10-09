import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = () => (
    <ContentLoader
        height={100}
        width={300}
        speed={1}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
        className="u"
    >
        <rect x="15" y="0" rx="3" ry="3" width="100" height="10" />
        <rect x="120" y="0" rx="3" ry="3" width="100" height="10" />
        <rect x="225" y="0" rx="3" ry="3" width="100" height="10" />
        <rect x="15" y="20" rx="3" ry="3" width="150" height="10" />
        <rect x="175" y="20" rx="3" ry="3" width="150" height="10" />
        <rect x="15" y="40" rx="3" ry="3" width="100" height="10" />
        <rect x="120" y="40" rx="3" ry="3" width="100" height="10" />
        <rect x="225" y="40" rx="3" ry="3" width="100" height="10" />
    </ContentLoader>
);

export default MyLoader;