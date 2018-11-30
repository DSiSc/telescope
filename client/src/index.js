import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import createStore from './state/store';
import { unregister } from './registerServiceWorker';
import tableOperations from './state/redux/tables/operations';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/index.scss';
import './assets/css/base.css';
import './assets/css/pe-icon-7-stroke.css';


import DefaultLayout from './layouts/DefaultLayout';

const store = createStore()
store.dispatch(tableOperations.channel())
store.dispatch(tableOperations.channelList())
store.dispatch(tableOperations.channels())
unregister()

ReactDOM.render(
  <HashRouter>
  	<Provider store={store} >
	    <Switch>
	      <Route to="/" component={DefaultLayout} />;
	    </Switch>
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);
