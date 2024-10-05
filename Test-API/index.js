const express = require ('express')
const bodyParser = require('body-parser')
const {generateToken} = require('./jwUtils');

const app = express()
const port = 3000

app.use(bodyParser.json());


app.use(require('./router.js'))

app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`)
})
