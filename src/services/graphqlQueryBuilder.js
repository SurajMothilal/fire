import { gql } from "@apollo/client"

const queries = {
    getAccountsByUser: () =>  gql`
        query AccountsForUser {
        accountsForUser(userId: $userId) {
          id
          name
        }
      }
    `,
}

export {
    queries
}