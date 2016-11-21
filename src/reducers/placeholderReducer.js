import {
	ADD_TASK,
	DELETE_TASK,
	FETCH_TASKS,
	UPDATE_TASK
} from '../actions/placeholderActionCreator';

import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-upsert'));
const db = new PouchDB('t4sk/tasks');

// ======================

const initialState = {
	tasks: []
}

const placeholderReducer = (state = initialState, action) => {
	switch(action.type) {
		case FETCH_TASKS:
			return Object.assign({}, state, {
				tasks: action.tasks
			});
		case UPDATE_TASK:
			return Object.assign({}, state, {
				tasks: state.tasks.map(task => {
					if (task._id === action.savedTask._id) {
						return taskReducer(task, action);
					}
					return task;
				})
			});
		case DELETE_TASK:
			return state;
		case ADD_TASK:
			return Object.assign({}, state, {
				tasks: state.tasks.concat(action.task)
			});
		default:
			return state;
	}
}

const taskSchema = {
	createdAt: null,
	status: null, //'active', // 'completed' || 'outstanding'
	title: null, //'placeholder',
	description: null,
	parentId: null
}

const taskReducer = (state = taskSchema, action) => {
	let { type, savedTask } = action;
	switch(type) {
		case UPDATE_TASK:
			return Object.assign({}, state, savedTask);
		default:
			return state;
	}
}


export default placeholderReducer;