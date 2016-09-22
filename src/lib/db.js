import Parse from 'parse';

const Task = Parse.Object.extend("Task");

export const getAllTasks = (args1, args2) => {
	if (args1 == 'empty') {
		return [];
	}

	let query = new Parse.Query(Task);
	query.find()
	.then((results) => {
		console.log('results', results);
		return results;
	})
}