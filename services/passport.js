const passport = require('Passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');


passport.use(new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleSecret,
		callbackURL: '/auth/google/callback'
	},
	(accessToken, refreshToken, profile, cb) => {
		
	}
));