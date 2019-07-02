import { applyMiddleware, createStore, compose } from 'redux';
import createRootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const composeEnhansers = process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;
const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhansers(applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
    ))
);

sagaMiddleware.run(rootSaga);

export default store;