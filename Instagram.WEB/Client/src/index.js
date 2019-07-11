import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import store, { history } from './store';
import { signInSuccess } from './store/user/actions';
import globalDispatch from './helpers/dispatch/globalDispatch';
import { getAccessToken } from './utils/localStorage';
import { setAuthorizationHeader } from './api/api';
import jwt_decode from 'jwt-decode';

import './index.scss';

const initAccessToken = () => {
    const token = getAccessToken();
    if (token) {
        const payload = jwt_decode(token);
        globalDispatch(signInSuccess({ userName: payload.userName }));
        setAuthorizationHeader(token);
    }
};

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Route component={App} />
            </ConnectedRouter>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
    initAccessToken
);