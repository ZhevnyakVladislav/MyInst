import store from '../../store';
import { dispatchAction } from '@redux-dynostore/core';

export const globalDispatch = (action) => {
    store.dispatch(action);
};

export const dynamicDispatch = action => data => dispatchAction(action(data))()(store);

export default globalDispatch;
