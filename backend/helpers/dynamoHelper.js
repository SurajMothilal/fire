const { v4 } = require('uuid')
// Create the DynamoDB service client module using ES6 syntax.
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')

const { GetCommand, QueryCommand, PutCommand, DeleteCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb")
// Set the AWS Region.
const REGION = "us-east-1" // For example, "us-east-1".
// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({ 
    region: REGION,
    credentials: {
        accessKeyId: 'AKIAT5QF64ZBBXGKFBDZ',
        secretAccessKey: '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'
    }
})

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
}

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
}

const translateConfig = { marshallOptions, unmarshallOptions }

// Create the DynamoDB document client.
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig)

const getUser = async (id) => {
    const params ={
        TableName: 'User',
        Key: {
            id: id
        }
    }
    const user = await ddbDocClient.send(new GetCommand(params))
    return user.Item
}

const saveAccount = async (accountObject) => {
    const timestamp = Math.floor(new Date().getTime() / 1000)
    const params ={
        TableName: 'Account',
        Item: {
            id: v4(),
            name: accountObject.name,
            balance: accountObject.balance,
            currency: accountObject.currency,
            type: accountObject.type,
            userId: accountObject.userId,
            updatedAt: timestamp,
            createdAt: timestamp
        }
    }
    const result = await ddbDocClient.send(new PutCommand(params))
    return result
}

const getUserAccounts = async (userId) => {
    const params ={
        TableName: 'Account',
        IndexName: 'UserAccounts',
        KeyConditionExpression: 'userId = :useId',
        ExpressionAttributeValues: { ':useId': userId }
        
    }
    const userAccounts = await ddbDocClient.send(new QueryCommand(params))
    return userAccounts.Items
}

const editAccount = async (accountEditObject) => {
    const timestamp = Math.floor(new Date().getTime() / 1000)
    const params ={
        TableName: 'Account',
        Item: {
            id: accountEditObject.id,
            name: accountEditObject.name,
            balance: accountEditObject.balance,
            currency: accountEditObject.currency,
            type: accountEditObject.type,
            userId: accountEditObject.userId,
            updatedAt: timestamp,
        }
    }
    const result = await ddbDocClient.send(new PutCommand(params))
    return result
}

const deleteAccount = async (accountId) => {
    const params ={
        TableName: 'Account',
        Key: {
            id: accountId
        }
    }
    const user = await ddbDocClient.send(new DeleteCommand(params))
    return user.Item
}

// const saveFireProfile = async (fireProfileObject) => {
//     const fireProfile = await db('fireprofile').insert(fireProfileObject).returning('id')
//     return { id: fireProfile[0].id }
// }

// const getFireProfileForUser = async (userId) => {
//     const fireProfile = await db('fireprofile').where('userId', userId)
//     return fireProfile.length > 0 ? fireProfile[0] : null
// }

module.exports = {
    getUser,
    getUserAccounts,
    saveAccount,
    editAccount,
    deleteAccount,
    // saveFireProfile,
    // getFireProfileForUser
}