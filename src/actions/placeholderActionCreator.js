export const ADD_TASK = 'ADD_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const FETCH_TASKS = 'FETCH_TASKS';

import moment from 'moment'
import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-upsert'));
const db = new PouchDB('t4sk/tasks');

export const deleteTaskAll = () => {
	db.allDocs({
		include_docs: true
	})
	.then(res => {
		res.rows.map(item => {
			db.remove(item.doc);
		})
	})
}

export const fetchTasks = () => {
	return (dispatch) => {
		db.allDocs({
			include_docs: true
		})
		.then(res => {
			return res.rows.map(item => {
				return item.doc;
			});
		})
		.then(tasks => {
			dispatch({
				type: FETCH_TASKS,
				tasks
			})
		})
	}
}

export const toggleTask = (id, rev, status) => {
	return (dispatch) => {
		if (status !== 'active') {
			status = 'active';
		} else {
			status = 'completed';
		}

		db.upsert(id, (doc) => {
			doc.status = status;
			return doc;
		})
		.then(res => {
			if (res.updated) {
				return db.get(id);
			}
			throw new Error('update fail');
		})
		.then(savedTask => {
			dispatch({
				type: UPDATE_TASK,
				savedTask
			})
		})
		.catch(err => {
			console.log(err);
		})
	}
}

// ============================================================

const taskSchema = {
	createdAt: 'placeholder',
	status: 'active', // 'completed' || 'outstanding'
	title: 'placeholder',
	description: null,
	parentId: null
}

export const addTask = (task) => {
	return (dispatch) => {
		// deleteTaskAll();
		const now = moment.utc().format();

		let doc = Object.assign({}, taskSchema, task, {
			createdAt: now
		});
		db.post(doc)
		.then(doc => {
			return db.get(doc.id);
		})
		.then(savedTask => {
			dispatch({
				type: ADD_TASK,
				task: savedTask
			})	
		})
	}
}