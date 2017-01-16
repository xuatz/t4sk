import React from 'react'
import { Collapse, Icon, AutoComplete } from 'antd'

let styles = {
	flexcontainer: {
		display: 'flex',
		flexDirection: 'row'
	},
	item: {
		flex: '1'
	}
}

const CoolShit = (props) => (
	<div>
		<span> Demo cool shit </span>
	</div>
)

const Sample = () => {
	let completedTasks = ["completed1", "completed2", 'compelted3']

	const Panel = Collapse.Panel

	return (
		<div>
			<p>
				*This is a mockup for a daily report screen*
			</p>

			<section style={{
				display: 'none',
				background: 'red'
			}} >
				<div style={{
					padding: '5px 20px',
					...styles.flexcontainer
				}} >
					<div style={styles.item}>
						<h3 style={{color: 'black'}}>Tasks completed
						</h3>
						
						{completedTasks.map((item, index) => 
							<div key={index} >
								{item}
							</div>
						)}
					</div>
					<div style={styles.item}>
						<h3 style={{color: 'black'}}>Tasks abandoned
						</h3>
						
					</div>
				</div>
			</section>
			<section style={{
				background: 'orange'
			}} >
				<div style={{
					padding: '5px 20px',
					...styles.flexcontainer
				}} >
					<div style={styles.item}>
						<h3 style={{color: 'black'}}>
							Today's Performance Score: <span style={{color: 'red', fontSize: '20px'}}> SSS</span> (WAOW such impress)
						</h3>
						
						{completedTasks.map((item, index) => 
							<div key={index}
								style={{
									textDecoration: 'line-through'
								}}
							>
								<Icon type="check" /> {item} 
							</div>
						)}
						<div style={{
								// textDecoration: 'line-through'
							}}
						>
							<Icon type="close" /> <b>Get Rich</b> (Failed to accomplish on 4 occasions)
						</div>
						<div style={{
								// textDecoration: 'line-through'
							}}
						>
							<Icon type="close" /> <b>Reach 9000 mmr</b>
						</div>
					</div>
				</div>
			</section>
			<section style={{
				background: 'lightblue'
			}} >
				<div style={{
					padding: '5px 20px'
				}} >
					<h3 style={{color: 'black'}}>Tasks added today / Tasks for review</h3>

					<div style={{
						padding: '10px 0px'
					}} >
						<Collapse accordion>
							<Panel header="Buy some apple" key="1">
								<p>This section should be a form</p>
							</Panel>
							<Panel header="Find out about redux-saga" key="2">
								<p>This section should be a form</p>
							</Panel>
						</Collapse>
					</div>
						
				</div>
			</section>
			<section style={{
				background: 'lightgreen'
			}} >
				<div style={{
					padding: '5px 20px'
				}} >
					<h3 style={{color: 'black'}}>Assign Priority Tasks for tomorrow</h3>

					<div style={{
						padding: '10px 0px',
						...styles.flexcontainer
					}} >
						<div style={styles.item}>
							<h3 style={{color: 'black'}}>Tasks for tomorrow
							</h3>

							<div>
								<AutoComplete 
									style={{ 
										width: 200,
										border: '0.5px dashed',
										borderRadius: '4px'
									}}
									placeholder="Task 1"
									dataSource={['12345', '23456', '34567']} />
							</div>
							<div>
								<AutoComplete 
									style={{ 
										width: 200,
										border: '0.5px dashed',
										borderRadius: '4px'
									}}
									placeholder="Task 2"
									dataSource={['12345', '23456', '34567']} />
							</div>
							<div>
								<AutoComplete 
									style={{ 
										width: 200,
										border: '0.5px dashed',
										borderRadius: '4px'
									}}
									placeholder="Task 3"
									dataSource={['12345', '23456', '34567']} />
							</div>
							<div>
								<AutoComplete 
									style={{ 
										width: 200,
										border: '0.5px dashed',
										borderRadius: '4px'
									}}
									placeholder="Task 4"
									dataSource={['12345', '23456', '34567']} />
							</div>
						</div>
						<div style={styles.item}>
							<h3 style={{color: 'black'}}>Bounty Board
							</h3>
							
							{completedTasks.map((item, index) => 
								<div key={index} >
									<Icon type="caret-left" /> {item}
								</div>
							)}
							{completedTasks.map((item, index) => 
								<div key={index} >
									<Icon type="caret-left" /> {item}
								</div>
							)}
							{completedTasks.map((item, index) => 
								<div key={index} >
									<Icon type="caret-left" /> {item}
								</div>
							)}
						</div>
					</div>

						
						
				</div>
			</section>
		</div>
	);
};

export default Sample;
