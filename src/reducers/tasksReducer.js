// import _ from 'lodash';

export default function tasksReducer(state = [], action) {
	switch (action.type) {
		case 'ADD_TASK':
			return state.concat({
				title: action.title,
				isComplete: false
			});
		default:
			return state;
	}
}
