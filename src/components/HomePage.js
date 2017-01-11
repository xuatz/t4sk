import React from 'react'

import TaskCreate from '../containers/TaskCreate'
import TaskList from '../containers/TaskList'

const HomePage = () => {
	return (
		<div>
			<TaskCreate />
			<TaskList />
		</div>
	);
};

export default HomePage;
