const logger = require('newrelic')
const express = require('express')
const errorMiddleware = require('./middleware/errorMiddleware')
const app = express()
const port = 3000
const { getAccountsByUser } = require('./helpers/databaseHelper')

app.get('/accountsByUser', async (req, res, next) => {
    try {
        const accounts = await getAccountsByUser(req?.query?.id)
        res.json({ accounts })
    } catch (error) {
        next(error)
    }
})

app.post('/user', async (req, res, next) => {
    try {
        const user = await createUser(req?.query?.id)
        res.json({ user })
    } catch (error) {
        next(error)
    }
})

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})