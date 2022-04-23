import { InMemoryCache ,makeVar } from '@apollo/client'

export const loggedInUserId = makeVar(null)

export const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
            loggedInUserId: {
                read() {
                    return loggedInUserId()
                },
            },
        },
      },
    },
})