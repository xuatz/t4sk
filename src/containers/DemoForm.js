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
		console.log('addTask()');
		console.log('values', values);

		let { title } = values;

		dispatch({
			type: 'ADD_TASK',
			title
		})
	}
}

export class DemoForm extends React.Component {
	constructor(props) {
		super(props);
		this.doSubmit = this.doSubmit.bind(this);
	}

	componentDidMount() {
		//hydrate component here if needed, will trigger re-render here
	}

	doSubmit(values) {
		console.log('doSubmit')
		this.props.addTask(values);
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

DemoForm = reduxForm({ form: 'demoForm' })(DemoForm)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DemoForm);

