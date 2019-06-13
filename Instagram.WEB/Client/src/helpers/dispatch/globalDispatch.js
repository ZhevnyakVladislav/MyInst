import store from '../../store/';

const globalDispatch = (action) => {
    store.dispatch(action);
};

export default globalDispatch;
