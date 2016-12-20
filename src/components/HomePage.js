import React from 'react'

import TaskCreate from '../containers/TaskCreate'
import TaskList from '../containers/TaskList'

const HomePage = () => {
	return (
		<div>
			<div className="itc-container"
				style={{
					// background:'red'
				}}>
				<div>
					<TaskCreate />
					<TaskList />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
