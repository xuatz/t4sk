const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
const MongoStore = require('connect-mongo')(session);

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const bcrypt = require('bcrypt-nodejs');
// const postmark = require('postmark')('420ed311-edc7-4de5-9ab0-cee6caccf26e'); //TODO:xz: perhaps we can put this in the config.yaml

const Promise = require('bluebird');
const mongoose = require('mongoose');

const _ = require('lodash');

// ===========================================================

//xz:07/10/16: seems like some bug with express session, might be fixed if we upgrade express
// temp solution to suppress warning
// https://github.com/jdesboeufs/connect-mongo/issues/214
// Promise.config( { warnings: { wForgottenReturn: false } } );

// ===========================================================

const config_module = require('yaml-config')
const configFile = "./config.yaml";
const config = config_module.readConfig(configFile);

const util = require('../utils/util');

//=============================================================
//=== setup mongoose with mongo database
//=============================================================

mongoose.Promise = Promise;

let dbConnectionString = 'mongodb://' + config.db.host + '/' + config.db.name;
// if (config.db.host) {
// 	dbConnectionString += config.db.host;
// }
// if (config.db.port) {
// 	dbConnectionString += ":" + config.db.port;
// }
// dbConnectionString += "/" + config.db.name;

let options = { 
	server: { 
		auto_reconnect: true, 
		socketOptions: { 
			keepAlive: 100, 
			connectTimeoutMS: 5000, 
			socketTimeoutMS: 30000
		}
	}
};

// if (config.db.user) {
// 	options = Object.assign(options, {
// 		user: config.db.user,
// 		pass: config.db.pass
// 	});
// }

mongoose.connection.on('error', function(error) {
	console.log('mongoose err', error);
});
mongoose.connection.on('connected', function() {
    console.log('Connection established to MongoDB');
});
mongoose.connection.on('reconnected', function() {
    console.log('Reconnected to MongoDB');
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', function() {
	mongoose.connection.close(function () {
		console.log('Force to close the MongoDB conection');
		process.exit(0);
    });
});

mongoose.connect(dbConnectionString, options);

//=============================================================
//=== declaring passport strategies
//=============================================================

const User = require('../models/user');

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, (email, password, done) => {
	// console.log('hi im in localstrategety!')

	if (!email) {
		return done(null, false, {
			message: 'Email cannot be empty'
		})
	}

	if (!password) {
		return done(null, false, {
			message: 'password cannot be empty'
		})
	}

	// ====

	User.findOne({
		email: email
	}).exec()
	.then(aUser => {
		if (!aUser) {
			return done(null, false, {
				message: 'No existing user with given email'
			})
		}

		aUser.comparePassword(password, (err, isMatch) => {
			if (err) {
				return done(err)
			}

			if (!isMatch) {
				return done(null, false, {
					message: 'Provided password is invalid'
				})
			} else {
				return done(null, aUser);
			}
		});
	})
	.catch(err => {
		return done(err);
	});
}));

passport.use(new GoogleStrategy({
	clientID: config.GOOGLE_CLIENT_ID,
	clientSecret: config.GOOGLE_CLIENT_SECRET,
	callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, cb) => {
	console.log('profile', profile);

	// { 
	// 	id: '108362839627921075362',
	// 	displayName: 'warehouse dev',
	// 	name: { familyName: 'dev', givenName: 'warehouse' },
	//  emails: [ { value: 'dev.warehouse@fellowshoppers.com', type: 'account' } ],
	// 	photos: [ { value: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50' } ],
	// 	gender: undefined,
	// 	provider: 'google',
	// }

	util.findOneOrCreateNewUser(profile)
	.then(existingUser => {
		console.log('hi1');
		//if a user was found via user.email, but does not have user.accounts fields
		if (!existingUser.accounts) {
			console.log('hi2');
			return cb(null, false, {
				message: 'An account was already create with this email! Please login with your password!'
			})
		} else {
			console.log('hi3');
			console.log('existingUser.accounts', existingUser.accounts)
			console.log('profile.provider', profile.provider)

			sameProvider = _.find(existingUser.accounts, account => {
				console.log(account.provider);
				console.log('account.provider === profile.provider', account.provider === profile.provider);
				return account.provider === profile.provider;
			})

			if (!sameProvider) {
				return cb(null, false, {
					message: 'An account was already create with this email! Please login with your password!'
				})
			}

			console.log('hi4');
			return cb(null, existingUser);	
		}
	})
	.catch(err => {
		return cb(err);
	})
}));

//=============================================================
//=== express server config to support cors auth with express-session
//=============================================================
const app = express();
app.set('trust proxy', true); //for express to trust nginx for https delivery
app.use(cors({
	origin: 'http://localhost:3000', //it is essential that explicit origin (single or a list) is defined, wildcard not allowed.
	credentials: true //this allows for cors auth
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//make sure to have a working session store
app.use(session({
	// store: new RedisStore({}),
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	}), 
	secret: 'asdf33g4w4hghjkuil8saef345',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	cookie: { 
		maxAge: 60000 * 20000
	}
}))
//make sure express session is defined first before calling the following 2 passport methods
app.use(passport.initialize());
app.use(passport.session());
//=============================================================

app.get('/', (req, res) => {
	res.json({
		msg: 'why are you here?'
	})
})

//xz: template for working with passport.authenticate and interaction with done()
app.post('/auth/email', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		//xz: this function is essentially done()
		//by defining a custom callback, i can send the error msg back to the client.
		//but it also means that we need to handle req.logIn() ourselves

		//xz: deal with this after we settle the session/cors/jwt problem

		console.log('info', info)
		if (err) { 
			return next(err); 
		}
		if (!user) { 
			//TODO STUB
			return res.redirect('/login'); 
		}
		req.logIn(user, function(err) {
			if (err) { 
				return next(err); 
			}

			console.log(req);

			return res.json({
				message: 'login success'
			})
		});
	})(req, res, next)
});

app.get('/auth/google', (req, res, next) => {
	console.log('req.headers.referer', req.headers.referer);
	console.log('req.query.return_url', req.query.return_url);
	req.session.return_url = req.query.return_url || req.headers.referer || 'http://localhost:3000';
	next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
	passport.authenticate('google', { failureRedirect: '/login' }),
	function(req, res) {
		console.log(req);
		console.log(req.headers.origin);
		// Successful authentication, redirect home.
		// return res.redirect('http://localhost:3000')

		var url = req.session.return_url;
		delete req.session.return_url;

		// redirects to /#/returnHash
		res.redirect(url);
	}
);

app.get('/user', (req, res) => {
	console.log('GET /user');
	console.log(req.user);
	res.json(req.user);
})

app.get('/amiloggedin', (req, res) => {
	console.log('GET /amiloggedin');
	console.log('req.user', req.user)
	console.log('req.sessionID', req.sessionID)

	res.json(req.user);
})

app.get('/logout', (req, res) => {
	console.log('GET /logout');
	req.logout();
	res.sendStatus(200);
})

passport.serializeUser(function(user, done) {
	console.log("SERIALIZE!!")
	done(null, user.id)
})
passport.deserializeUser(function(id, done) {
	console.log("DESERIALIZE!!")
	User.findOne({_id:id}, function (err, user) {
		done(err, user);
	});
});

app.listen(3030);

//================================================================================================



// // ==================

// const User = require('../models/user');



// const configurePassport = () =>{
// 	// Passport local strategy
// 	passport.use('loginpassword', new LocalStrategy( {
// 		passReqToCallback: true,
// 		usernameField: 'email',
// 		passwordField: 'password'
// 	}, function(req, email, password, done) {
// 		console.log("Checking user login particulars..")
// 		User.findOne({ $or:[{'email': email.toLowerCase()},{'username': email}] }, function(err, user) {
// 			if (err) { return done(err) }
// 			if (user) 
// 			{
// 				if (user.tempLoginHash)
// 				{
// 					return done(null, false, { message: 'Registration confirmation is first required' })
// 				}

// 				if (user.password!=undefined)
// 				{
// 					user.comparePassword(password, function(err, isMatch) {
// 						if (err) throw err;
// 						if(isMatch)
// 						{
// 							return done(null, user)
// 						} 
// 						else 
// 						{
// 							return done(null, false, { message: 'Invalid password' })
// 						}
// 					})
// 				} else 
// 				{
// 					return done(null, false, { message: 'User has no password' })
// 				}
// 			} 
// 			else 
// 			{
// 				return done(null, false, { message: 'Unknown user' })
// 			}
// 		})
// 	}))

// 	// Passport local strategy - temporary hash to verify email at registration
// 	passport.use('temporaryhashNew', new LocalStrategy({
// 		usernameField: 'login_hash',
// 		passwordField: 'login_hash'
// 	}, function(hash, password /* not necessary */ , done) {
// 		console.log('xz:21/10/16:hi2001');
// 		if (!hash) {
// 			return done(null, false, { message: 'No hash' })
// 		} else {
// 			User.findOne({ 'tempLoginHash': hash, 'tempHashValidTill': { $gt: new Date()} })
// 			.then(user => {
// 				if (!user) {
// 					//found no user with provided hash
// 					return done(null, false, { message: 'Unknown user' })
// 				} else {
// 					console.log('xz:21/10/16:user.username:before', user.username);

// 					user.username = user.name + user.intid;
// 					user.tempLoginHash = null;
// 					user.tempHashValidTill = null;

// 					console.log('xz:21/10/16:user.username:after', user.username);

// 					user.save()
// 					.then(user => {
// 						return done(null, user);
// 					})
// 					.catch(err => {
// 						return done(err, null, 'Failed to save user');
// 					});
// 				}
// 			})
// 			.catch(err => {
// 				return done(err);
// 			})
// 		}
// 	}));

// 	// Passport local strategy - temporary hash on password reset
// 	passport.use('temporaryhashRecover', new LocalStrategy({
// 		usernameField: 'login_hash',
// 		passwordField: 'login_hash'
// 	}, function(hash, password /* not necessary */ , done) {
// 		if(hash){
// 			User.findOne({ 'tempLoginHash': hash, 'tempHashValidTill': { $gt: new Date()} }, function(err, user) {
// 				if (err) { return done(err) }
// 				if (user) {
// 					return done(null, user)
// 				} else {
// 					return done(null, false, { message: 'No user found with hash' });
// 				}
// 			})
// 		}
// 	}))

// 	// Passport local strategy - temporary hash on trial user creation and first use
// 	passport.use('temporaryhashTrial', new LocalStrategy(
// 		{
// 			usernameField: 'login_hash',
// 			passwordField: 'login_hash'
// 	  },
// 		function(hash, password /* not necessary */ , done) {
// 			if(hash){
// 				User.findOne({ 'tempLoginHash': hash, 'tempHashValidTill': { $gt: new Date()} }, function(err, user) {
// 					if (err) { return done(err) }
// 					if (user)
// 	                {
// 						return done(null, user)
// 					}
// 	                else
// 	                {
// 						return done(null, false, { message: 'Unknown user' })
// 					}
// 				})
// 			} else {
// 				return done(null, false, { message: 'No hash' })
// 			}
// 		}
// 	))

// 	console.log("|---- Local strategy launched")

// 	// Passport Facebook strategies
// 	passport.use('joinFacebook', new FacebookStrategy({
// 		passReqToCallback: true,
// 		clientID: config.facebook.id,
// 		clientSecret: config.facebook.secret,
// 		callbackURL: '/join/facebook/callback',
// 		profileFields: ['id', 'first_name', 'last_name', 'email', 'displayName', 'link', 'photos']
// 	}, (req, accessToken, refreshToken, profile, done) => {
// 		User.findOne({$or: [{ 'accounts.uid': profile.id, 'accounts.provider': 'facebook' }, {'email':profile._json.email}]})
// 		.then(existingUser => {
// 			if (existingUser) {
// 				console.log("fb account already registered")
// 				//! Here must be an exception handler. Now it is unobvious for end user what happens
// 				done(null, false, { message: 'This Facebook account or its email is already registered, please log in instead.' })
// 			} else {
// 				fsutil.createAndSaveNewUser({
// 					'email': profile._json.email,
// 					'name': profile._json.first_name, //TODO:xz:10/10/16: i really want to change this field to firstName
// 					'lastname': profile._json.last_name, //TODO:xz:10/10/16: i really want to change this field to lastName
// 					'country': 'SG', //TODO:xz:10/10/16: we should detect or allow for selection for this right?
// 					'accounts': [{
// 						provider: "facebook",
// 						uid: profile.id,
// 						name: profile._json.first_name + profile._json.last_name,
// 						//screenname: profile._json.screen_name,
// 						//location: profile._json.location,
// 						//description: profile._json.description,
// 						url: profile._json.url,
// 						//language: profile._json.lang,
// 						picture: profile.photos[0].value
// 					}]
// 				})
// 				.then(newUser => {
// 					done(null, newUser);
// 				})
// 				.catch(err => {
// 					console.log(err);
// 					done(err);
// 				})
// 			}
// 		})
// 	}));

// 	passport.use('authFacebook', new FacebookStrategy({
// 		passReqToCallback: true,
// 		clientID: config.facebook.id,
// 		clientSecret: config.facebook.secret,
// 		callbackURL: "/auth/facebook/callback"
// 	}, (req, accessToken, refreshToken, profile, done) => {
// 		User.findOne({ 'accounts.uid': profile.id, 'accounts.provider': 'facebook' })
// 		.then(existingUser => {
// 			if(existingUser) {
// 				done(null, existingUser)
// 			} else {
// 				done(null, false, { message: 'No user found!' })
// 			}
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			done(err);
// 		})	
// 	}));

// 	//xz:11/10/16: case study for connecting with facebook
// 	passport.use('connectFacebook',
// 		new FacebookStrategy(
// 			{
// 				passReqToCallback: true,
// 				clientID: config.facebook.id,
// 				clientSecret: config.facebook.secret,
// 				callbackURL: "/connect/facebook/callback",
// 				profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
// 			},
// 			function(req, accessToken, refreshToken, profile, done) {
// 				// console.log(accessToken)
// 				// console.log(refreshToken)
// 				// console.log(profile)
// 				process.nextTick(function () {
// 					User.findOne({ 'accounts.uid': profile.id, 'accounts.provider': 'facebook' }, function(err, existingUser) {
// 						if(existingUser) {
// 							//! Here must be an exception handler. Now it is unobvious for end user what happens
// 							return done(null, false, { message: 'Another profile uses this Facebook account' })
// 						} else {
// 							var user = req.user
// 							if(user){
// 								//console.log(profile)
// 								var newAccount = {
// 									provider: "facebook",
// 									uid: profile.id,
// 									name: profile._json.name,
// 									screenname: profile._json.screen_name,
// 									location: profile._json.location,
// 									description: profile._json.description,
// 									url: profile._json.url,
// 									language: profile._json.lang,
// 									picture: profile.photos[0].value
// 								}
// 								user.accounts.push(newAccount)
// 								user.save(function(err) {
// 									if(err) { throw err }
// 									done(null, user)
// 								})
// 							}
// 						}
// 					})
// 				})
// 			}
// 		)
// 	)

// 	//xz:10/10/16: apparently there are some... ninja changes to passport-google-oauth20 or something
// 	// no need to provide root path, it seems to auto detect (waow)
// 	// i.e. callbackURL: config.host + '/join/google/callback'
// 	//	 => callbackURL: '/join/google/callback'

// 	// Passport Google strategies
// 	passport.use('joinGoogle', new GoogleStrategy({
// 		passReqToCallback: true,
// 		clientID: config.google.id,
// 		clientSecret: config.google.secret,
// 		callbackURL: "/join/google/callback",
// 		//profileFields: ['id', 'givenName', 'familyName', 'emails', 'displayName', 'url', 'image']
// 	}, (req, accessToken, refreshToken, profile, done) => process.nextTick(() => {
// 		User.findOne({$or: [{ 'accounts.uid': profile.id, 'accounts.provider': 'google' }, {'email':profile.emails[0].value}]})
// 		.then((existingUser) => {
// 			if (existingUser) {
// 				console.log("google account already registered")
// 				//TODO: Here must be an exception handler. Now it is unobvious for end user what happens
// 				return done(null, false, { message: 'This Google account or its email is already registered, please log in instead.' })	
// 			} else {
// 				fsutil.createAndSaveNewUser({
// 					'email': profile.emails[0].value,
// 					'name': profile._json.name.givenName, //TODO:xz:10/10/16: i really want to change this field to firstName
// 					'lastname': profile._json.name.familyName, //TODO:xz:10/10/16: i really want to change this field to lastName
// 					'country': 'SG', //TODO:xz:10/10/16: we should detect or allow for selection for this right?
// 					'accounts': [{
// 						provider: "google",
// 						uid: profile.id,
// 						name: profile._json.name.givenName + profile._json.name.familyName,
// 						//screenname: profile._json.screen_name,
// 						//location: profile._json.location,
// 						//description: profile._json.description,
// 						url: profile._json.url,
// 						//language: profile._json.lang,
// 						picture: profile._json.image.url
// 						//picture: profile.photos[0].value
// 					}]
// 				})
// 				.then(newUser => {
// 					if (newUser) {
// 						return done(null, newUser);
// 					}
// 					return done(null, null, { message: 'Something gone wrong, user not created' });
// 				})
// 				.catch(err => {
// 					console.log(err);
// 					return done(null, false, { message: 'DB Error #1!' })
// 				})
// 			}
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return done(null, false, { message: 'DB Error #1!' })
// 		})
// 	})))

// 	passport.use('authGoogle', new GoogleStrategy({
// 		passReqToCallback: true,
// 		clientID: config.google.id,
// 		clientSecret: config.google.secret,
// 		callbackURL: "/auth/google/callback"
// 	}, (req, accessToken, refreshToken, profile, done) => process.nextTick(() => {
// 		User.findOne({ 'accounts.uid': profile.id, 'accounts.provider': 'google' })
// 		.then((user) => {
// 			if (user) {
// 				return done(null, user)
// 			}
// 			return done(null, false, { message: 'No user found' })
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			return done(null, false, { message: 'There was an error.' })
// 		})
// 	})));

// 	passport.serializeUser(function(user, done) {
// 		//console.log("SERIALIZE!!")
// 		done(null, user.id)
// 	})
// 	passport.deserializeUser(function(id, done) {
// 		User.findOne({_id:id}, function (err, user) {
// 			done(err, user) 
// 		})
// 	})
// 	console.log("Passport configured") 	
// }

// // ==================

// if (!process.env.NODE_ENV) {
// 	process.env.NODE_ENV = 'development'
// }
// console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

// // Reading configuration
// const configFile = "config.yaml";
// const config = config_module.readConfig(configFile);
// console.log("Configuration read")

// //====================================================================
// //======= configuring database and mongoose - start
// //====================================================================

// //xz:07/10/16: seems like some bug with express session, might be fixed if we upgrade express
// // temp solution to suppress warning
// // https://github.com/jdesboeufs/connect-mongo/issues/214
// // Promise.config( { warnings: { wForgottenReturn: false } } );
// mongoose.Promise = Promise;

// // ========================

// let dbConnectionString = 'mongodb://';
// if (config.db.host) {
// 	dbConnectionString += config.db.host;
// }
// if (config.db.port) {
// 	dbConnectionString += ":" + config.db.port;
// }
// dbConnectionString += "/" + config.db.name;

// let options = { 
// 	server: { 
// 		auto_reconnect: true, 
// 		socketOptions: { 
// 			keepAlive: 100, 
// 			connectTimeoutMS: 5000, 
// 			socketTimeoutMS: 30000
// 		}
// 	}
// };

// if (config.db.user) {
// 	options = Object.assign(options, {
// 		user: config.db.user,
// 		pass: config.db.pass
// 	});
// }

// mongoose.connection.on('error', function(error) {
// 	console.log('mongoose err', error);
// });
// mongoose.connection.on('connected', function() {
//     console.log('Connection established to MongoDB');
// });
// mongoose.connection.on('reconnected', function() {
//     console.log('Reconnected to MongoDB');
// });

// // Close the Mongoose connection, when receiving SIGINT
// process.on('SIGINT', function() {
// 	mongoose.connection.close(function () {
// 		console.log('Force to close the MongoDB conection');
// 		process.exit(0);
//     });
// });

// mongoose.connect(dbConnectionString, options);
// // Schema = mongoose.Schema // ???

// // ======================================================================

// // need to... read the models and schema??

// // ======================================================================

// const app = express();

// // ======================================================================



// // ======================================================================

// app.use(session({
//     store: new MongoStore({
// 		mongooseConnection: mongoose.connection
// 	}), 
// 	secret: 'Secret session salt is secured', 
// 	resave: false,
// 	saveUninitialized: true,
// 	//cookie: {maxAge: 60000 * 20000} 
// }));

// configurePassport();
// app.use(passport.initialize());
// app.use(passport.session());

// // ======================================================================
// // ======================================================================
// // ======================================================================
// // ======================================================================
// // ======================================================================
// // ======================================================================
// // ======================================================================
// // ======================================================================
// // ======================================================================
// // ======================================================================

// app.use('/warehouse', require('./api/warehouse'));


// app.listen(3050);
// console.log('server started: localhost:3050');