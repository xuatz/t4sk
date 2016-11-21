import React from 'react';
// import { BrowserRouter, Match, Miss, Link } from 'react-router';

import Main from '../containers/Main';

import '../styles/main.scss';

// ==================================================

const Header = () => (
	<div className='header'>
		Header
	</div>
)

const SidebarLeft = () => (
	<div className='sidebar sidebar-left'>
		SidebarLeft
	</div>
)

const Footer = () => (
	<div className='footer'>
		Footer
	</div>
)

const App = () => (
	<div className="wrapper">
		<Header />
		<div className="container main-content" >
			{/* <SidebarLeft /> */}
			<div style={{padding: '20px'}} >
				<Main />
			</div>
		</div>
		<Footer />
	</div>
);

export default App;