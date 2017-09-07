import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

import App from './App';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';
import Welcome from './components/Welcome';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

import RequireAuth from './components/auth/RequireAuth';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Welcome} />
                <Route path="signin" component={Signin} />
                <Route path="signout" component={Signout} />
                <Route path="signup" component={Signup} />
                <Route path="feature" component={RequireAuth(Feature)} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
