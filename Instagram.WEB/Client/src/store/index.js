import { applyMiddleware, createStore, compose } from 'redux';
import createRootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { getAccessToken } from '../utils/localStorage';
import { setAuthorizationHeader } from '../api/api';
import jwt_decode from 'jwt-decode';
// import { createInitialState } from './user/reducer';

export const history = createBrowserHistory();

const initUserStore = () => {
    const token = getAccessToken();
    if (token) {
        const payload = jwt_decode(token);
        setAuthorizationHeader(token);

        return {
            userName: payload.userName,
            isUserAuth: true
        };
    }

    return {};
};

const initialState = () => {
    const userStore = initUserStore();
    return {
        user: {
            data: {
                userName: userStore.userName
            },
            isUserAuth: userStore.isUserAuth
        }
    };
};
const sagaMiddleware = createSagaMiddleware();
const composeEnhansers = process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;
const store = createStore(
    createRootReducer(history),
    initialState(),
    composeEnhansers(applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
    ))
);

sagaMiddleware.run(rootSaga);

export default store;