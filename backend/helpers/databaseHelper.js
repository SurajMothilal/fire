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

const deleteAccount = async (accountId) => {
    const accounts = await db('accounts').where({ id: accountId }).del().returning('id')
    return { id: accounts[0].id }
}

const saveFireProfile = async (fireProfileObject) => {
    const fireProfile = await db('fireprofile').insert(fireProfileObject).returning('id')
    return { id: fireProfile[0].id }
}

const getFireProfileForUser = async (userId) => {
    const fireProfile = await db('fireprofile').where('userId', userId)
    return fireProfile.length > 0 ? fireProfile[0] : null
}

module.exports = {
    getAccountsByUser,
    saveAccount,
    editAccount,
    deleteAccount,
    saveFireProfile,
    getFireProfileForUser
}