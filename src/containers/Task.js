
import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import { Form, Dropdown, Button, Grid, Card, Message } from 'semantic-ui-react';
// import _ from 'lodash';

// import ItemCard from '../components/ItemCard';

// import * as actions from '../actions/dutyCalculatorActions';
// import '../styles/dutycal.scss';

import { Modal, Checkbox, Button } from 'antd';
import { reduxForm, Field } from 'redux-form';

import 'antd/dist/antd.css';

// ===================================

const CustomInput = (field) => {
	return (
		<div style={{
			display: 'flex',
			flexWrap: 'wrap',
			// padding: '4px 0px',
			justifyContent: 'space-around'
			// justifyContent: 'center'
		}} >
			<label style={{
				flex: '1',
				textAlign: 'right',
				marginRight: '5px'
			}} >
				{field.label}
			</label>
			<input style={{
				flex: '3',
				textAlign: 'left'
			}} {...field.input} type="text" placeholder={field.placeholder} />
		</div>
	)
}

const CustomInput2 = (props) => {
	let { tasks, selectedTaskId } = props;
	let clonedTasks = [].concat(tasks);

	let selectedTask = _.remove(clonedTasks, (task) => {
		console.log('task.id', task.id)
		return task.id === selectedTaskId
	})[0]

	let parentTask;
	if (selectedTask && selectedTask.parentId) {
		parentTask = _.remove(clonedTasks, (task) => {
			return task.id === selectedTask.parentId
		})[0]
	}

	const clearTaskParent = () => {
		// console.log('CustomInput2', 'clearTaskParent()');
		props.clearTaskParent(selectedTask.id)
	}

	const setTaskParent = (parentId) => {
		// console.log('selectedTask', selectedTask);
		// console.log('parentId', parentId);
		props.setTaskParent(selectedTask.id, parentId);
	}

	return (
		<div style={{
			display: 'flex',
			flexWrap: 'wrap',
			// padding: '4px 0px',
			marginBottom: '4px',
			justifyContent: 'space-around'
			// justifyContent: 'center'
		}} >
			<label style={{
				flex: '1',
				textAlign: 'right',
				marginRight: '5px'
			}} >
				{props.label}
			</label>

			<div style={{
				flex: '3',
				textAlign: 'left',
			}}>
				{parentTask ? (
					<div style={{margin: '0px 0px 4px'}} >
						<Button 
							size="small"
							type="primary"
							style={{marginRight:'2px'}}
							onClick={clearTaskParent}
						>	
							{parentTask.title}
						</Button>
					</div>	
				) : null}
				
				<div>
					{clonedTasks.map((item, index) => {
						return (
							<Button 
								key={index}
								size="small"
								// type="primary"
								style={{marginRight:'2px'}}
								onClick={() => {
									setTaskParent(item.id)
								}}
							>	
								{item.title}
							</Button>
						)
					})}
				</div>
					
			</div>
		</div>
	)
}

let TaskEditForm = (props) => {
	return (<div>
		<form onSubmit={console.log('huat')}>
			
			<Field label="Suite ID" name="suiteID" component={CustomInput} placeholder="*placeholder*"/>
			<Field label="Suite ID" name="suiteID" component={CustomInput} placeholder="*placeholder*"/>
			<Field label="Suite ID" name="suiteID" component={CustomInput} placeholder="*placeholder*"/>
		</form>
	</div>)
}

TaskEditForm = reduxForm({ form: 'TaskEditForm' })(TaskEditForm)

// ===================================

function onChange(e) {
	console.log(`checked = ${e.target.checked}`);
}

const mapStateToProps = (state) => {
	return {
		tasks: state.tasks
	}
};

const mapDispatchToProps = (dispatch) => ({
	toggleTask: (id) => {
		dispatch({
			type: 'TASK_TOGGLE_STATUS',
			id
		})
	},
	clearTaskParent: (id) => {
		dispatch({
			type: 'TASK_CLEAR_PARENT_TASK',
			id
		})	
	},
	setTaskParent: (id, parentId) => {
		dispatch({
			type: 'TASK_SET_PARENT_TASK',
			id,
			parentId
		})	
	}
	// actions: bindActionCreators(actions, dispatch)
});

const styles = {
	taskComplete: {
		 textDecoration: 'line-through'
	}
}

export class Task extends React.Component {
	// constructor(props) {
 //        super(props);

 //        this.state = {
	// 		isModalVisible: false
	// 	};
 //    }

	state = {
		isModalVisible: false
	};

	componentDidMount() {
		//hydrate component here if needed, will trigger re-render here
	}

	handleToggleTask = (event) => {
		// console.log(event)
		this.props.toggleTask(this.props.id)
	}

	showModal = (event) => {
		this.setState({
			...this.state,
			isModalVisible: true
		})
	}

	handleOk = () => {
		this.setState({
			...this.state,
			isModalVisible: false
		})
	}

	handleCancel = () => {
		this.setState({
			...this.state,
			isModalVisible: false
		})
	}

	render() {
		let { isComplete, title, id } = this.props;

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
						onOk={this.handleOk} onCancel={this.handleCancel}
					>
						<CustomInput2 
							label="Parent Task"
							tasks={this.props.tasks} 
							selectedTaskId={id}
							clearTaskParent={this.props.clearTaskParent}
							setTaskParent={this.props.setTaskParent}
							// tasks={props.tasks}
							// selectedTaskId={props.selectedTaskId} 
							/>
						<TaskEditForm  />

						{/*
							<TaskEdit />
						*/}
						
					</Modal>

				</Button>
			</div>
			
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Task);