const User = require('../models/user');

exports.createNewUser = (profile) => {
	console.log('util:createNewUser()');
	return User.create(Object.assign({}, {
		email: profile.emails[0].value,
		firstName: profile.name.givenName,
		lastName: profile.name.familyName,
	}, {
		accounts: [profile]
	}))
	.catch(err => {
		throw err;
	})
}

exports.findOneOrCreateNewUser = (profile) => {
	console.log('util:findOneOrCreateNewUser()');
	return User.findOne(
		{
			$or: [
				{ 
					'accounts.uid': profile.id, 
					'accounts.provider': 'google' 
				}, 
				{
					'email':profile.emails[0].value
				}
			]
		}
	).exec()
	.then(existingUser => {
		if (!existingUser) {
			return exports.createNewUser(profile);
		}
		return existingUser;
	})
	.catch(err => {
		throw err;
	})
}


