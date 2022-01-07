const express = require('Express');
require('./services/passport');

const app = express();
require('./routes/authRoute')(app);

app.listen(5000);