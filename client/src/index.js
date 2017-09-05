import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import './index.css';
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
