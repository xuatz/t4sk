import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import { Menu, Dropdown, Icon } from 'antd';
// import _ from 'lodash';

// import ItemCard from '../components/ItemCard';

import * as actions from '../actions/userActions';
// import '../styles/dutycal.scss';

import axios from 'axios';

import logo from '../assets/Triangle_logo.png';

// =============================================

const api = axios.create({
  baseURL: 'http://localhost:3030/',
  timeout: 1000,
  withCredentials: true
}); 

const menu = (
	<Menu>
		<Menu.Item>
			<Link to="/services/import-tax" activeStyle={{color: '#B3894C'}}>
				Import Tax Calculator
			</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to="/services/comparision" activeStyle={{color: '#B3894C'}}>
				Comparision
			</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to="/services/global-trade" activeStyle={{color: '#B3894C'}}>
				Global Trade
			</Link>
		</Menu.Item>
	</Menu>
);

// =============================================

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		user: state.user.user
	}
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch)
});

export class Header extends React.Component {
	constructor(props) {
		super(props);

		// this.handleChange = this.handleChange.bind(this);
		this.state = {}
	}

	componentDidMount() {
		//hydrate component here if needed, will trigger re-render here
		api.get('/user')
		.then(res => {
			// console.log(res);
			console.log(res.status);
			// console.log(res.statusText);
			console.log(res.data)
			this.props.actions.updateLoginStatus(res.data)
		})
		.catch(err => {
			console.log(err);
			throw err;
		})
	}

	render() {
		return (
			<div style={{background:'#0F2453'}}>
				<div className="itc-container header">
					<div id="navigation"  style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}} >
						<div style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',}} >
							<img src={logo} style={{height:'40px', width:'auto'}} />
							<Link to="/">
								<span style={{fontSize: '24px', color: '#B3894C', paddingLeft: '10px'}} >
									IMPORT TAX CALCULATOR
								</span>
							</Link>
						</div>

						<ul>
							<li>
								<Dropdown overlay={menu}>
									<a className="ant-dropdown-link" href="#">
										Tools <Icon type="down" />
									</a>
								</Dropdown>
							</li>
							{this.props.isLoggedIn ? (
								<li>
									<a href="#" onClick={this.props.actions.logout}  >
										Logout
									</a>
								</li>
							) : (
								<div style={{display:'inline'}} >
									<li><Link to="/signup" activeStyle={{color: '#B3894C'}}>Sign Up</Link></li>
									<li><Link to="/login" activeStyle={{color: '#B3894C'}}>Login</Link></li>
								</div>					
							)}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);