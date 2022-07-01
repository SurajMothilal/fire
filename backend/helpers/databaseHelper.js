const db  = require('../data/db')

const getAccountsByUser = async (userId) => {
    const accounts = await db('accounts').where('userId', userId)
    return accounts
}

const saveAccount = async (accountObject) => {
    const accounts = await db('accounts').insert(accountObject).returning('id')
    return { id: accounts[0].id }
}

const editAccount = async (accountEditObject) => {
    const accounts = await db('accounts').where({ id: accountEditObject.id }).update(accountEditObject).returning('id')
    return { id: accounts[0].id }
}

module.exports = {
    getAccountsByUser,
    saveAccount,
    editAccount
}