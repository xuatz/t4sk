import React from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field } from 'redux-form';

const mapStateToProps = (state) => {
	return {

	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		addTask: (values) => {
			dispatch(addTask(values))
		}
	}
}

const addTask = (values) => {
	return (dispatch) => {
		let { title } = values;
		dispatch({
			type: 'ADD_TASK',
			title
		})
	}
}

export class TaskListSimple1 extends React.Component {
	componentDidMount() {
		//hydrate component here if needed, will trigger re-render here
	}

	doSubmit = (values) => {
		if (values.title) {
			this.props.addTask(values);
			this.props.reset();
		}
	}

	render() {
		return (
			<div>
				{this.}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TaskListSimple1);