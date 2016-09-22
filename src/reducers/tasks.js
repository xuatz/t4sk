import * as actions from '../actions';

const tasks = (state = [], action) => {
	switch(action.type) {
	case actions.ADD_TASK:
		alert('TODO STUB');
		return state;
	default:
		return state;
	}
}

export default tasks;