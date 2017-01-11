import React from 'react';
import { BrowserRouter, Match, Miss, 
	// Link 
} from 'react-router';

// import { Menu, Dropdown, Icon } from 'antd';
// import 'antd/dist/antd.css';

// import Header from '../containers/Header';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage.js';
import Sample from './Sample'


import '../styles/main-page.scss';

// ===============================================

// const Footer = () => (
// 	<div style={{background:'#B3894C'}}>
// 		<div className="itc-container" style={{textAlign: 'center'}} >
// 			©2016 Placeholder Footer
// 		</div>
// 	</div>
// );

const App = () => (
	// 2. render a `Router`, it will listen to the url changes
	//    and make the location available to other components
	//    automatically
	<BrowserRouter>
		<div>
			{/* <Header /> */}

			<div className="itc-container"
				style={{
					// background:'red'
				}}>
				<Match exactly pattern="/" component={HomePage} />

				<Match exactly pattern="/sample" component={Sample} />

				<Miss component={NotFoundPage}/>
			</div>
			
			{/* <Footer /> */}
		</div>
	</BrowserRouter>
);

export default App;
