import PouchDB from 'pouchdb'
import uuid from 'uuid/v4'

export const TASK_ADD_NEW = 'TASK_ADD_NEW'
export const TASK_FETCH_ALL = 'TASK_FETCH_ALL'

// ======================

const db = new PouchDB('tasks');
// const remoteDB = new PouchDB('http://localhost:5984/myremotedb')
const remoteDB = new PouchDB('http://whateverwhateverwhatever.mooo.com:5984/tasks')

db.replicate.to(remoteDB, {
	live: true,
	retry: true
}).on('change', function (change) {
  // yo, something changed!
}).on('paused', function (info) {
  // replication was paused, usually because of a lost connection
}).on('active', function (info) {
  // replication was resumed
}).on('error', function (err) {
  // totally unhandled error (shouldn't happen)
});

export const addTask = (values) => {
	return (dispatch) => {
		let { title } = values;
		let _id = uuid();

		db.put({
			_id,
			title,
			isComplete: false,
			parentId: null,
			createdAt: new Date(),
			createdBy: null, //todo
			description: Math.random()
		})
		.then(() => {
			return db.get(_id);
		})
		.then(doc => {
			console.log(doc);
			dispatch({
				type: TASK_ADD_NEW,
				task: doc
			})
			return doc;
		})
		.catch(err => {
			console.log(err);
		})
	}
}

export const fetchTasks = () => {
	return (dispatch) => {
		db.getDocs({
			include_docs: true
		})
		.then(tasks => {
			if (tasks) {
				dispatch({
					type: TASK_FETCH_ALL,
					tasks
				})
				return true;
			}
		})
		.catch(err => {
			console.log(err);
		})
	}
}
