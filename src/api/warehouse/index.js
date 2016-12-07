const router = require('express').Router();
const Line = require('../../models/line');

// router.use((req, res, next) => {
// 	if (!req.user) {
// 		//TODO xz: redirect to login
// 		res.status(403).send('Forbidden') //temp usage
// 	} else {
// 		//TODO xz: check if authorised?
// 		next();
// 	}
// })

router.get('/random', (req, res) => {
	res.send('hi!');
})

router.get('/lines', (req, res) => {
	// Line.find({ warehouse: req.user.warehouse, trashed: { $ne: true }, order: { $exists: false } }).sort("-intid").populate('user').populate('warehouse')
	Line.find({})
	.then(lines => {
		if (!lines) {
			res.send({
				status: 'NO RESULTS', //TODO xz:26/10/16:standarise error msg?
				data: []
			})
		} else {
			// var accessLevel = getAccessLevel(req.user); //xz: not sure about significance yet

			// res.render('users-we/lines', {
			// 	dblines: lines,
			// 	isFullAccess: (accessLevel > 1)
			// })
			res.send({
				status: 'OK',
				data: lines
			});
		}
	})
	.catch(err => {
		console.log(err);
		res.send({
			status: 'SERVER ERROR!' //TODO xz:26/10/16:standarise error msg?
		})
	})
});

module.exports = router;
