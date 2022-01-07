const express = require('Express');
require('./services/passport');

const app = express();
require('./routes/authRoutes')(app);

app.listen(5000);