
import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import { Form, Dropdown, Button, Grid, Card, Message } from 'semantic-ui-react';
// import _ from 'lodash';

// import ItemCard from '../components/ItemCard';

// import * as actions from '../actions/dutyCalculatorActions';
// import '../styles/dutycal.scss';

import { Checkbox } from 'antd';

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

const mapStateToProps = (state) => {
	// return {
		
	// }
};

const mapDispatchToProps = (dispatch) => ({
	toggleTask: () => {

	}
	// actions: bindActionCreators(actions, dispatch)
});

const styles = {
	taskComplete: {
		 textDecoration: 'line-through'
	}
}

export class Task extends React.Component {
	constructor(props) {
		super(props);

		// this.handleChange = this.handleChange.bind(this);
		this.state = {}
	}

	componentDidMount() {
		//hydrate component here if needed, will trigger re-render here
	}

	handleToggleTask = (e, a, b, c) => {
		console.log(e.target.checked);
	}

	render() {
		let { isComplete, title } = this.props;

		return (
			<Checkbox 
				checked={isComplete || false}
				// onChange={handleToggleTask}
				onChange={this.handleToggleTask}
			>
				<span style={isComplete ? styles.taskComplete : null} >
					{title}
				</span>
			</Checkbox>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Task);