const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((usr, done) => {
	done(null, usr.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(usr => {
			done(null, usr);
		});
})

passport.use(new GoogleStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleSecret,
		callbackURL: '/auth/google/callback',
		proxy: true
	},
	async (accessToken, refreshToken, profile, done) => {
			
		const existingUser = await User.findOne({googleId: profile.id})
		if(existingUser){
			done(null, existingUser);
		}else{
			const newUser = await new User({googleId: profile.id}).save()
			done(null, newUser);
		}
	}
));