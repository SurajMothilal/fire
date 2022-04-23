import React, { useCallback, useState } from 'react'
import { values } from '../constants'
import { useQuery } from '@apollo/client'
import { signOut } from '../services/auth'
import { localQueries } from '../services/graphqlQueryBuilder'
import Button from './common/Button'

const Home = ({ signOutSuccess }) => {
    const [signingOut, setSigningOut] = useState(false)
    const { data } = useQuery(localQueries.loggedInUserId())
    console.log(data)
    const handleSignOutSuccess = useCallback(() => {
        setSigningOut(false)
        signOutSuccess()
    })
    const handleSignOutFailure = useCallback((error) => {
        setSigningOut(false)
        console.log(error)
    })
    const handleSignOut = useCallback(async () => {
        setSigningOut(true)
        await signOut(handleSignOutSuccess, handleSignOutFailure)
    })

    return (
        <Button
            variant={values.primary}
            title="Sign out"
            handlePress={() => handleSignOut()}
            disabled={signingOut}
        />
    )
}

export default Home;