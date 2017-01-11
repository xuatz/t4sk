// import _ from 'lodash';

import {
	TASK_ADD_NEW,
	TASK_DELETE,
	TASK_FETCH_ALL
} from '../actions/taskActions'

const taskReducer = (state = {}, action) => {
	switch (action.type) {
		case 'TASK_UPDATE_DETAILS':
			return {
				...state,
				...action.values
			}
		case 'TASK_TOGGLE_STATUS':
			return {
				...state,
				isComplete: !state.isComplete
			}
		case 'TASK_CLEAR_PARENT_TASK':
			return {
				...state,
				parentId: null
			}
		case 'TASK_SET_PARENT_TASK':
			return {
				...state,
				parentId: action.parentId
			}
		default:
			return state;
	}
}

export default function tasksReducer(state = [], action) {
	switch (action.type) {
		case 'TASK_UPDATE_DETAILS':
			// falls through
		case 'TASK_CLEAR_PARENT_TASK':
			// falls through
		case 'TASK_SET_PARENT_TASK':
			// falls through
		case 'TASK_TOGGLE_STATUS':
			return state.map(item => {
				if (item._id === action._id) {
					return taskReducer(item, action);
				}
				return item;
			})
		case 'TASK_DELETE':
			return state.filter(item => {
				return item._id !== action._id
			})
		case TASK_ADD_NEW:
			return [].concat(action.task).concat(state)
		case TASK_FETCH_ALL:
			return action.tasks || state;
		default:
			return state;
	}
}
