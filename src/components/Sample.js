import React from 'react'

const Sample = () => {
	let completedTasks = ["completed1", "completed2", 'compelted3']

	return (
		<div>
			<p>
				*This is a mockup for a daily report screen*
			</p>

			<section style={{
				background: 'red'
			}} >
				Tasks completed

				<div style={{
					padding: '5px 20px'
				}} >
					{completedTasks.map((item, index) => 
						<div>
							{item}
						</div>
					)}
				</div>
			</section>
			<section>
				Tasks added today
			</section>
			<section>
				Tasks 
			</section>
		</div>
	);
};

export default Sample;
