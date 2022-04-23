const db  = require('../data/db')

const getAccountsByUser = async (userId) => {
    const accounts = await db('account').where('user_id', userId)
    console.log(accounts)
    return accounts
}

module.exports = {
    getAccountsByUser
}