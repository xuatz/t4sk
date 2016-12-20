
import React from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import { Form, Dropdown, Button, Grid, Card, Message } from 'semantic-ui-react';
// import _ from 'lodash';

// import ItemCard from '../components/ItemCard';

// import * as actions from '../actions/dutyCalculatorActions';
// import '../styles/dutycal.scss';

import { Modal, Checkbox, Button } from 'antd';

import 'antd/dist/antd.css';

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
		let { isComplete, title } = this.props;

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
						{this.props.tasks.map((item, index) => {
							return (
								<Button size="small"
									type="primary"
									style={{margin:'0px 2px'}}
								>	
									{item.title}
								</Button>
							)
						})}

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