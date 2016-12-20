// import _ from 'lodash';

import uuid from 'uuid/v4'

const taskReducer = (state = {}, action) => {
	switch (action.type) {
		case 'TASK_TOGGLE_STATUS':
			return {
				...state,
				isComplete: !state.isComplete
			}
		default:
			return state;
	}
}

export default function tasksReducer(state = [], action) {
	switch (action.type) {
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
				createdAt: new Date(),
				createdBy: null
			});
		default:
			return state;
	}
}
