import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Modal, Checkbox, Button } from 'antd'
import { reset } from 'redux-form'

import CustomInput2 from '../components/CustomInput2'
import CustomInput3 from '../components/CustomInput3'

import { 
	deleteTask
} from '../actions/taskActions'

import 'antd/dist/antd.css';

const confirm = Modal.confirm;

// ===================================

const mapStateToProps = (state) => {
	// let formValues = {}

	// if (state.form && state.form.TaskEditForm && state.form.TaskEditForm.values) {
	// 	formValues = state.form.TaskEditForm.values;
	// }

	return {
		tasks: state.tasks
	}
};

const mapDispatchToProps = (dispatch) => ({
	deleteTask: (doc) => {
		dispatch(deleteTask(doc))
	},
	toggleTask: (_id) => {
		dispatch({
			type: 'TASK_TOGGLE_STATUS',
			_id
		})
	},
	clearTaskParent: (_id) => {
		dispatch({
			type: 'TASK_CLEAR_PARENT_TASK',
			_id
		})	
	},
	setTaskParent: (_id, parentId) => {
		dispatch({
			type: 'TASK_SET_PARENT_TASK',
			_id,
			parentId
		})	
	},
	updateTask: (_id, values) => {
		dispatch({
			type: 'TASK_UPDATE_DETAILS',
			_id,
			values
		})	
	},
	resetTaskEditForm: () => {
		dispatch(reset('TaskEditForm'));
	}


	// actions: bindActionCreators({
	// 	// ...actions,
	// 	toggleTask: (id) => {
	// 		dispatch({
	// 			type: 'TASK_TOGGLE_STATUS',
	// 			id
	// 		})
	// 	},
	// 	clearTaskParent: (id) => {
	// 		dispatch({
	// 			type: 'TASK_CLEAR_PARENT_TASK',
	// 			id
	// 		})	
	// 	},
	// 	setTaskParent: (id, parentId) => {
	// 		dispatch({
	// 			type: 'TASK_SET_PARENT_TASK',
	// 			id,
	// 			parentId
	// 		})	
	// 	},
	// 	updateTask: (id, values) => {
	// 		dispatch({
	// 			type: 'TASK_UPDATE_DETAILS',
	// 			id,
	// 			values
	// 		})	
	// 	},
	// }, dispatch)
});

const styles = {
	taskComplete: {
		textDecoration: 'line-through'
	}
}

export class Task extends React.Component {
	state = {
		isModalVisible: false
	};

	componentDidMount() {
		//hydrate component here if needed, will trigger re-render here
	}

	handleToggleTask = () => {
		// console.log(event)
		this.props.toggleTask(this.props.task._id)
	}

	showModal = () => {
		this.setState({
			...this.state,
			isModalVisible: true
		})
	}

	handleOk = () => {
		console.log('handleOk()')
		this.setState({
			...this.state,
			isModalVisible: false
		})
	}

	handleCancel = () => {
		console.log('handleCancel()')

		this.setState({
			...this.state,
			isModalVisible: false
		})

		// console.log('this.props.task', this.props.task)

		// if (this.props.task.id == this.props.formValues.id) {
		// 	this.props.updateTask(this.props.task.id, this.props.formValues)
		// }

		this.props.resetTaskEditForm();
	}

	handleFieldOnChange = (values) => {
		console.log('handleFieldOnChange()')
		this.props.updateTask(this.props.task._id, values)
	}

	render() {
		let { deleteTask, task } = this.props;
		let { isComplete, title, id } = task;

		return (
			<div style={{padding: '5px 0px'}} >
				<Checkbox 
					checked={isComplete || false}
					// onChange={handleToggleTask}
					onChange={this.handleToggleTask}
				/>

				<span style={isComplete ? styles.taskComplete : null} >
					{title}
				</span>

				<Button shape="circle" icon="edit" 
					size="small" 
					onClick={this.showModal}
				>
					<Modal 
						title="Basic Modal" 
						visible={this.state.isModalVisible}
						onOk={this.handleOk} 
						onCancel={this.handleCancel}
						footer={null}
					>
						<CustomInput2 
							label="Parent Task"
							tasks={this.props.tasks} 
							selectedTaskId={id}
							clearTaskParent={this.props.clearTaskParent}
							setTaskParent={this.props.setTaskParent}
							/>

						<hr />

						<CustomInput3
							label="Title"
							name="title"
							value={this.props.task.title}
							onChange={this.handleFieldOnChange} />

						<CustomInput3
							label="Description"
							type="textarea"
							name="description"
							value={this.props.task.description}
							onChange={this.handleFieldOnChange} />
						
					</Modal>

				</Button>

				<Button shape="circle" icon="delete" size="small" 
					onClick={() => {
						confirm({
    						title: 'Are you sure you want to delete this task?',
    						onOk() {
    							deleteTask(task)
      						},
      						onCancel() {},
      						okText: 'Delete',
      						cancelText: 'Cancel'
      					});
					}} />
			</div>
			
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Task);

// ===================================

// const CustomInput = (field) => {
// 	return (
// 		<div style={{
// 			display: 'flex',
// 			flexWrap: 'wrap',
// 			// padding: '4px 0px',
// 			justifyContent: 'space-around'
// 			// justifyContent: 'center'
// 		}} >
// 			<label style={{
// 				flex: '1',
// 				textAlign: 'right',
// 				marginRight: '5px'
// 			}} >
// 				{field.label}
// 			</label>
// 			<input style={{
// 				flex: '3',
// 				textAlign: 'left'
// 			}} {...field.input} type="text" placeholder={field.placeholder} />
// 		</div>
// 	)
// }

// function onChange(e) {
// 	console.log(`checked = ${e.target.checked}`);
// }