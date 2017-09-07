import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './App';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="signin" component={Signin} />
                <Route path="signout" component={Signout} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
