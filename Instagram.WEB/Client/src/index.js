import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import store, { history } from './store';
import ErrorBoundary from './common/errorBoundary/ErrorBoundary';

import './index.scss';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'bulma-helpers/css/bulma-helpers.min.css';

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