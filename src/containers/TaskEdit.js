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

export class TaskEdit extends React.Component {
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
			<form onSubmit={props.handleSubmit(handleSubmit)}>
				<Field component={CustomInput}
					label="Line ID FSPID -"
					name="firstName" 
					placeholder="*placeholder*"/>
				<Field 
					label="Suite ID"
					name="suiteID" component={CustomInput} placeholder="*placeholder*"/>
				<Field 
					label="Location *Pending Rework*"
					name="location" component={CustomInput} placeholder="*placeholder*"/>
				<Field 
					label="Merchant"
					name="merchant" component={CustomInput} placeholder="*placeholder*"/>

				<Field component={CheckboxInput} type="checkbox"
					label="Overweight, >25kg" name="isOverweight" />
				<Field component={CheckboxInput} type="checkbox"
					label="Oversized, (L+W+H)>160cm" name="isOversized" />
				<Field component={CheckboxInput} type="checkbox"
					label="Damaged" name="isDamaged" />
				<Field component={CheckboxInput} type="checkbox"
					label="Open" name="isOpened" />
				<Field component={CheckboxInput} type="checkbox"
					label="Incomplete" name="isIncomplete" />

				<Button htmlType="submit">
					Save
				</Button>
			</form>
		);
	}
}

TaskEdit = reduxForm({ form: 'TaskEdit' })(TaskEdit)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TaskEdit);

