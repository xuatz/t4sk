const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")

const SALT_WORK_FACTOR = 10;

const UserAccountsSchema = new Schema({
	provider: { type: String, required: true, trim: true },
	id: { type: String, required: true },
	name: { type: Array, trim: true },
	displayname: { type: String, trim: true },
	emails: { type: Array },
	// location: { type: String, trim: true },
	// description: { type: String, trim: true },
	// url: { type: String, trim: true },
	language: { type: String, trim: true },
	// picture: { type: String, trim: true },
}, {
	timestamps: true
});
// const UserAccounts = mongoose.model('UserAccounts', UserAccountsSchema)

const UserSchema = new Schema({
	accounts: [UserAccountsSchema]
	, email: { type: String }
	, password: { type: String }
	, country: { type: String }

	, tempLoginHash: { type: String }
    , tempHashValidTill: { type: Date , default: Date.now }

	, firstName: {type: String}
	, lastName: {type: String}

	// , info: {type: String}

	, role: {type: String}
}, {
	timestamps: true
});

UserSchema.pre('save', function(next) {
	var user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();
	// reset temporary hash
	//user.tempLoginHash = undefined
	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);
		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) return next(err);
			// override the cleartext password with the hashed one
			user.password = hash;
			console.log("Password changed")
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema);