import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const composeEnhansers = process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;
const store = createStore(
    rootReducer,
    initialState,
    composeEnhansers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;