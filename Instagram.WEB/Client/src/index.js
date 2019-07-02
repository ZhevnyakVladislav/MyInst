import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import store, { history } from './store';

import './index.scss';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Route component={App} />
            </ConnectedRouter>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);