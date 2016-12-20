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

export class TaskCreate extends React.Component {
	constructor(props) {
		super(props);
	}

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
			<form onSubmit={this.props.handleSubmit(this.doSubmit)}>
				<Field name="title" component="input"
					type="text" placeholder="buy milk after work"
					style={{
						minWidth:'280px',
						width: '60%'
				}} />
				<button type="submit" style={{
					margin: '0px 10px'
				}}>
					Add
				</button>
			</form>
		);
	}
}

TaskCreate = reduxForm({ form: 'TaskCreate' })(TaskCreate)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TaskCreate);