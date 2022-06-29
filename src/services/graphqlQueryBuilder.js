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