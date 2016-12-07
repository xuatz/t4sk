import axios from 'axios';
import { Redirect } from 'react-router';
import createHistory from 'history/createBrowserHistory'

//==============

export const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';
export const UPDATE_USER_LOGOUT = 'UPDATE_USER_LOGOUT';

// export const ;
// export const ;
// export const ;
// export const ;

const api = axios.create({
  baseURL: 'http://localhost:3030/',
  timeout: 1000,
  withCredentials: true
});

export const logout = () => {
	return (dispatch) => {
		api.get('/logout')
		.then(res => {
			if (res.status == 200) {
				dispatch({
					type: UPDATE_USER_LOGOUT
				})

				const history = createHistory({
					forceRefresh: true
				});
				history.push('/');
			}
		})
		.catch(err => {
			console.log(err);
			throw err;
		})
	}
}

export const updateLoginStatus = (user) => {
	return {
		type: UPDATE_LOGIN_STATUS,
		user
	}
}