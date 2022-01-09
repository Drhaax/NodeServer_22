const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passportService');
require('./models/User')

mongoose.connect(keys.mongoURI);

const app = express();
require('./routes/authRoute')(app);

app.listen(5000);