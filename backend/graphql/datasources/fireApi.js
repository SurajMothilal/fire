const { RESTDataSource } = require('apollo-datasource-rest')
const databaseHelper = require('../../helpers/dynamoHelper')

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
        userId: account.userId || null,
        updatedAt: account['updatedAt'] || '',
        createdAt: account['createdAt'] || ''
      }
  }

  userReducer(user) {
    return {
      id: user.id || null,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      dob: user.currency || '',
      accounts: user.accounts || [],
      updatedAt: user['updateAt'] || '',
      createdAt: user['createdAt'] || ''
    }
  }

  fireProfileReducer(fireProfile) {
    return {
      targetYear: fireProfile.targetYear || null,
      fireType: fireProfile.fireType || null,
      targetYearlyExpense: fireProfile.targetYearlyExpense || null,
      targetNetworth: fireProfile.targetNetworth || null,
      userId: fireProfile.userId || null,
      updatedAt: fireProfile['updatedAt'] || '',
      createdAt: fireProfile['createdAt'] || ''
    }
  }

  async getUser(id) {
    const response = await databaseHelper.getUser(id)
    return response ? this.userReducer(response) : response
  }

  async getUserAccounts(userId) {
      const response = await databaseHelper.getUserAccounts(userId)
      return Array.isArray(response)
        ? response.map(account => this.accountReducer(account))
        : []
  }

  async getFireProfileForUser(userId) {
    const response = await databaseHelper.getFireProfileForUser(userId)
      return response ? this.fireProfileReducer(response) : response
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

  async saveFireProfile(fireProfileObject) {
    const result = await databaseHelper.saveFireProfile(fireProfileObject)
    return result
  }
}

module.exports = FireAPI