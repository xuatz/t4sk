import _ from 'lodash';

import {
	UPDATE_LOGIN_STATUS,
	UPDATE_USER_LOGOUT
} from '../actions/userActions';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

const initialState = {
	isLoggedIn: false,
	user: {}
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_USER_LOGOUT:
			return Object.assign({}, state, {
				isLoggedIn: false,
				user: {}
			})
		case UPDATE_LOGIN_STATUS: 
			return Object.assign({}, state, {
				isLoggedIn: action.user ? true : false,
				user: action.user || {}
			});
		default:
			return state;
	}
}
