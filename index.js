const express = require('Express');
require('./services/passportService');

const app = express();
require('./routes/authRoute')(app);

app.listen(5000);