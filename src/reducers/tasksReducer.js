// import _ from 'lodash';

import uuid from 'uuid/v4'

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
			//fall thru
		case 'TASK_CLEAR_PARENT_TASK':
			//fall thru
		case 'TASK_SET_PARENT_TASK':
			//fall thru
		case 'TASK_TOGGLE_STATUS':
			return state.map(item => {
				if (item.id === action.id) {
					return taskReducer(item, action);
				}
				return item;
			})
		case 'ADD_TASK':
			return state.concat({
				id: uuid(),
				title: action.title,
				isComplete: false,
				parentId: null,
				createdAt: new Date(),
				createdBy: null,
				description: Math.random()
			});
		default:
			return state;
	}
}
