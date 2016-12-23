import React from 'react';
import _ from 'lodash';
import { Button } from 'antd'

const CustomInput2 = (props) => {
	let { tasks, selectedTaskId } = props;
	let clonedTasks = [].concat(tasks);

	let selectedTask = _.remove(clonedTasks, (task) => {
		// console.log('task.id', task.id)
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

export default CustomInput2