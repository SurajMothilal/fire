const express = require('express')
const app = express()
const port = 3000
const db = require('./data/db')

app.get('/', async (req, res) => {
    const users = await db('account')
    res.json({ users })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})