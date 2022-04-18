const pool = require('../pgconfig')

const getAccounts = (req, res) => {
    pool.query('SELECT * FROM ACCOUNTS WHERE user_id = ?', [req.body.userId], (error, entries) => {
        if (error) {
            throw error
        }
        res.status(200).json(entries.rows)
    })
}

module.exports = {
    getAccounts
}