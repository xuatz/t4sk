import React from 'react'

import DemoForm from '../containers/DemoForm'
import TaskList from '../containers/TaskList'

const HomePage = () => {
	return (
		<div>
			<div className="itc-container"
				style={{
					// background:'red'
				}}>
				<div style={{maxwidth: '100%', textAlign: 'center'}} >
					<DemoForm />
					<TaskList />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
