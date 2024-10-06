const express = require('express');
const bodyParser = require('body-parser');
const { generateToken } = require('./jwUtils');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(require('./router.js'));

app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});
