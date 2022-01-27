const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const req = require('express/lib/request');
const bodyParser = require('body-parser');

require('./models/User');
require('./services/passportService');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json())
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys:[keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute')(app);
require('./routes/billingRoutes')(app);

app.listen(process.env.PORT || 5000);