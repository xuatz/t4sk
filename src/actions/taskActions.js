import PouchDB from 'pouchdb'
import uuid from 'uuid/v4'

// ======================

export const TASK_ADD_NEW = 'TASK_ADD_NEW'
export const TASK_FETCH_ALL = 'TASK_FETCH_ALL'

// ======================

const db = new PouchDB('tasks');
const remoteDB = new PouchDB('http://ec2-35-166-214-108.us-west-2.compute.amazonaws.com:5984/tasks')

db.sync(remoteDB, {
	live: true,
	retry: true
}).on('change', function (change) {
	console.log('yo, something changed!')
}).on('paused', function (info) {
	console.log('replication was paused, usually because of a lost connection')
}).on('active', function (info) {
	console.log('replication was resumed')
}).on('error', function (err) {
	console.log('totally unhandled error (shouldnt happen)')
});

db.info().then(function (info) {
	console.log(info);
})

console.log(db.adapter); 

export const addTask = (values) => {
	console.log('addTask()');
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
	console.log('action creators: fetchTasks()')
	return (dispatch) => {
		db.allDocs({
			include_docs: true
		})
		.then(res => {
			console.log(res);
			if (res.rows) {
				dispatch({
					type: TASK_FETCH_ALL,
					tasks: res.rows.map(item => {
						return item.doc
					})
				})
				return true;
			}
		})
		.catch(err => {
			console.log(err);
		})
	}
}
