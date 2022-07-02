const { RESTDataSource } = require('apollo-datasource-rest')
const databaseHelper = require('../../helpers/databaseHelper')

class FireAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = process.env.FIRE_API
  }

  accountReducer(account) {
      return {
        id: account.id || null,
        name: account.name || '',
        balance: account.balance || '',
        currency: account.currency || null,
        type: account.type || '',
        userId: account.userId || null
      }
  }

  async getAccountsByUser(userId) {
      const response = await databaseHelper.getAccountsByUser(userId)
      return Array.isArray(response)
        ? response.map(account => this.accountReducer(account))
        : []
  }

  async saveAccount(accountObject) {
    const result = await databaseHelper.saveAccount(accountObject)
    return result
  }

  async editAccount(accountEditObject) {
    const result = await databaseHelper.editAccount(accountEditObject)
    return result
  }

  async deleteAccount(accountId) {
    const result = await databaseHelper.deleteAccount(accountId)
    return result
  }
}

module.exports = FireAPI