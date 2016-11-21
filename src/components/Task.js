import React from 'react';
import { Checkbox } from 'antd';



const Task = (props) => {

	const handleOnChange = (e) => {
		// console.log(`checked = ${e.target.checked}`);

		props.onChange(
			props.task._id,
			props.task._rev,
			props.task.status
		);
	}

	return (
		<div>
			<Checkbox 
				checked={props.task.status === 'completed'}
				onChange={handleOnChange}>
				{props.task.title}
			</Checkbox>
		</div>
	)	
}

export default Task;