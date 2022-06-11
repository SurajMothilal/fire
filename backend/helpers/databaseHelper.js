const db  = require('../data/db')

const getAccountsByUser = async (userId) => {
    const accounts = await db('accounts').where('user_id', userId)
    console.log(accounts)
    return accounts
}

const saveAccount = async (accountObject) => {
    const accounts = await db('accounts').insert(accountObject).returning('id')
    return { id: accounts[0].id }
}

module.exports = {
    getAccountsByUser,
    saveAccount
}