module.exports = function (err, req, res, next) {
    if (err.statusCode === 500) {
        res.sendStatus(500)
    } else {
        res.status(500).send('Something went wrong!')
    }
}