import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';

import configureStore from './store/configureStore'
import App from './containers/app';

import './index.css';

var APP_ID = "x02THLMuG7o1RNqFKQ4ZmfeAstAHt6r7ejSFOeDq";
var JAVASCRIPT_KEY = "BCK3GSK3auSwpmI28WMdr1yxEEJXInmYlcDzxYpy";
Parse.initialize(APP_ID, JAVASCRIPT_KEY);
Parse.serverURL = 'https://parseapi.back4app.com';

//====================

const store = configureStore();

render((
	<Provider store={store}>
		<div>
			<App />
		</div>
	</Provider>
), document.getElementById('root'));