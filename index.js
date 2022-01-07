const express = require('express');
require('./services/passportService');

const app = express();
require('./routes/authRoute')(app);

app.listen(5000);