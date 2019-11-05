import React, { useEffect, useState } from 'react';
import store from '../../store';

const withDynamicStore = (WrappedComponent, {
    storeName,
    reducer,
    saga
}) => {
    const dynamicStore = (props) => {

        const [isStoreAttached, setIsStoreAttached] = useState(false);

        useEffect(() => {
            reducer && store.attachReducers({ [storeName]: reducer });
            saga && store.runSagas({ [storeName]: saga });
            setIsStoreAttached(true);
            return () => {
                reducer && store.detachReducers([storeName]);
                saga && store.cancelSagas([storeName]);
                setIsStoreAttached(false);
            };
        }, []);

        if (isStoreAttached) {
            return <WrappedComponent {...props} />;
        }
        return null;
    };

    return dynamicStore;
};

export default withDynamicStore;

