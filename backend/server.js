const express = require('express')
const app = express()
const port = 3000
var db = require('./pgconfig');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})