import { gql } from "@apollo/client"

const queries = {
    getAccountsByUser: () =>  gql`
    query AccountsForUser($userId: String) {
      accountsForUser(userId: $userId) {
        id
        name
      }
    }
    `,
}

// Gets these from the client side cache (Reactive variables)
const localQueries = {
    loggedInUserId: () =>  gql`
        query loggedInUserId {
          loggedInUserId @client
        }
    `,
}

export {
    queries,
    localQueries
}