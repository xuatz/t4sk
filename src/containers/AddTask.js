import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

const mapStateToProps = (state) => {
	return {
		
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addTask: (title) => {
			dispatch({ 
				type: actions.ADD_TASK,
				title: title
			});
		},
	};
}

class AddTask extends Component {
	constructor(props) {
		super();
		
		this.addTask = this.addTask.bind(this);
	}


	addTask(event) {
		event.preventDefault();
		// console.log(event.target.form['taskTitle'].value);
		this.props.addTask(event.target.form['taskTitle'].value);
	}

	render() {
		return (
			<div>
				<form>
					<input name='taskTitle' type='text' />
					<input type="image" src='http://image.flaticon.com/icons/svg/54/54901.svg'
						style={{width:'25px', height:'25px'}}
						onClick={this.addTask} />
				</form>
			</div>
		);
	}

}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddTask);