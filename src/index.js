import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter,HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import Reducer from './Reducer';
import createBrowserHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk'
import middleware from './middleware/index';
import Root from './Root';

const browserHistory = createBrowserHistory();
const historyMiddleware = routerMiddleware(browserHistory)
const store = createStore(Reducer, applyMiddleware(thunk, ...middleware, historyMiddleware));
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
    <Provider store={store} key="provider">
        <HashRouter history={history} onUpdate={() => window.scrollTo(0, 0)}>
            <Root  history={history}/>
        </HashRouter>
    </Provider>, document.getElementById('root'));


