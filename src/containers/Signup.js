import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import { Form, Dropdown, Button, Grid, Card, Message } from 'semantic-ui-react';
// import _ from 'lodash';

import OAuthConnect from '../components/OAuthConnect';

// import * as actions from '../actions/dutyCalculatorActions';
// import '../styles/dutycal.scss';

const mapStateToProps = (state) => {
	return {

	}
};

const mapDispatchToProps = (dispatch) => ({
	// actions: bindActionCreators(actions, dispatch)
});

export class Signup extends React.Component {
	constructor(props) {
		super(props);

		// this.handleChange = this.handleChange.bind(this);
		this.state = {}
	}

	componentDidMount() {
		//hydrate component here if needed, will trigger re-render here
	}

	render() {
		return (
			<div className="itc-container">
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}} >
					<div style={{width:'300px'}}>
						<form>
							<div>
								<label>
									Email:
									<input style={{width:'100%'}} type="email" name="email" />
								</label>
							</div>
							<div>
								<label>
									Password:
									<input style={{width:'100%'}} type="password" name="password" />
								</label>
							</div>
							<div>
								<input style={{width:'100%'}} type="submit" value="Sign Up" />
							</div>
						</form>
					</div>

					<br />

					<OAuthConnect />
				</div>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup);