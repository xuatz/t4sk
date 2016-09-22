import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';

import configureStore from './store/configureStore'
import App from './containers/app';

import './index.css';

const store = configureStore();

render((
	<Provider store={store}>
		<div>
			<App />
		</div>
	</Provider>
), document.getElementById('root'));