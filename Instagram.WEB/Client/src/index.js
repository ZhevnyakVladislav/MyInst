import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import store, { history } from './store';
import ErrorBoundary from './common/components/errorBoundary/ErrorBoundary';

import './index.scss';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ErrorBoundary>
                <ConnectedRouter history={history}>
                    <Route component={App} />
                </ConnectedRouter>
            </ErrorBoundary>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
);