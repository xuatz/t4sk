import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Task from '../components/Task';

// import _ from 'lodash';

import * as actions from '../actions/placeholderActionCreator';
// import '../styles/Main.scss';

import PouchDB from 'pouchdb';

import { Form, Row, Button, Input, Icon, Col } from 'antd';
import 'antd/dist/antd.css';

// =================================================================

// var db = new PouchDB('kittens');
// var db = new PouchDB('http://localhost:5984/kittens');

const db = new PouchDB('t4sk/tasks');

const mapStateToProps = (state) => {
	return state.placeholder;
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch)
});

const styles = {
	highlightWrapper: {
		display: 'none',
		overflow: 'auto',
		borderRadius: '0 0 6px 6px'
	},
	highlightWrapperExpand: {
		display: 'block'
	}
}

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isActive: false,
			tasks: []
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.taskOnToggle = this.taskOnToggle.bind(this);
	}

	componentDidMount() {
		//hydrate component here if needed, will trigger re-render here

		this.props.actions.fetchTasks();
	}

	onChangeImportingToCountries(field, key) {
		
	}

	taskOnToggle(id, rev, status) {
		this.props.actions.toggleTask(id, rev, status);
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log('handleSubmit');
		this.props.form.validateFields( (err, values) => {
			if (err) {
				console.log('err', err);
				return;
			}

			// console.log('values', values);

			this.props.actions.addTask(values);
		})
	}

	render() {
		let { getFieldDecorator } = this.props.form;

		return (
			<div>
				<section>
					<Form inline onSubmit={this.handleSubmit}>
						<Form.Item>
							{getFieldDecorator('title', {
								rules: [{ 
									required: true, 
									message: 'Title is required!' 
								}],
							})(<Input 
								placeholder="dun forget to get some milk after work"
							/>)}
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">Add</Button>
						</Form.Item>
					</Form>
				</section>

				<section>
					{this.props.tasks.map((task, index)=>(
						<Task key={index} task={task} onChange={this.taskOnToggle} />
					))}
				</section>


				{/*
				<hr />
				<Row>
					<button onClick={()=>{
						console.log('hi guys');
						this.setState({
							isActive: !this.state.isActive
						})
					}} >
						Click me!
					</button>
					<section style={this.state.isActive ? styles.highlightWrapperExpand : styles.highlightWrapper} >
						<Row type="flex" justify="space-between" align="middle">
							<Col span={12}>
								<Input placeholder="Need to get some milk tonight" />
							</Col>
							<Col span={4}>
								<Button type="primary" htmlType="submit">Add</Button>
							</Col>
						</Row>
					</section>
				</Row>
				*/}
			</div>
		);
	}
}

Main = Form.create({})(Main);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);