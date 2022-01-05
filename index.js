const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send({ hi : 'thereee'});
});

const PORT = process.env.PORT;

app.listen(PORT);