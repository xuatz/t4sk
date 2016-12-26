import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import { Form, Dropdown, Button, Grid, Card, Message } from 'semantic-ui-react';
// import _ from 'lodash';

// import ItemCard from '../components/ItemCard';

// import * as actions from '../actions/dutyCalculatorActions';
// import '../styles/dutycal.scss';

import Task from '../containers/Task'

import { 
	fetchTasks
} from '../actions/taskActions'

// function onChange(e) {
//   console.log(`checked = ${e.target.checked}`);
// }

const mapStateToProps = (state) => {
	return {
		tasks: state.tasks || []
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchTasks: () => {
			dispatch(fetchTasks())
		}
	}
};

export class TaskList extends React.Component {
	constructor(props) {
		super(props);

		// this.handleChange = this.handleChange.bind(this);
		this.state = {}
	}

	componentDidMount() {
		//hydrate component here if needed, will trigger re-render here
		this.props.fetchTasks();
	}

	render() {
		return (
			<div style={{
				// textAlign:'left'
			}} >
				<ul>
					{this.props.tasks ? (
						this.props.tasks.map((item, index) => (
							<li key={index}>
								<Task task={item} />
							</li>	
						))
					) : null }
				</ul>
			</div>
			
		);
	}
}

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(TaskList);