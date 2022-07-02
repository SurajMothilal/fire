import { gql, useMutation } from "@apollo/client"

const queries = {
  getAccountsByUser: () =>  gql`
    query AccountsForUser($userId: String) {
      accountsForUser(userId: $userId) {
        id
        name
        balance
        currency
        type
        userId
      }
    }
    `,
}

const mutations = {
  saveAccount: () => gql`
    mutation SaveAccount($accountObject: AccountInput!) {
      saveAccount(accountObject: $accountObject) {
        id
      }
    }
  `,
  editAccount: () => gql`
    mutation EditAccount($accountEditObject: AccountEditInput!) {
      editAccount(accountEditObject: $accountEditObject) {
        id
      }
    }
  `,
  deleteAccount: () => gql`
    mutation DeleteAccount($accountId: ID!) {
      deleteAccount(accountId: $accountId) {
        id
      }
    }
  `
}

// Gets these from the client side cache (Reactive variables)
const localQueries = {
  loggedInUserId: () =>  gql`
      query loggedInUserId {
        loggedInUserId @client
      }
  `,
}


const useMutationHook = (query, successCallback, errorCallback) => {
  const [mutateFunction, { data, loading, error }] = useMutation(query, { onCompleted: successCallback, onError: errorCallback })
  return [mutateFunction, { data, loading, error }]
}

export {
    queries,
    localQueries,
    mutations,
    useMutationHook
}