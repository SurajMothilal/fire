import React, { useCallback, useState } from 'react';
import { values } from '../constants';
import { signOut } from '../services/auth';
import Button from './common/Button';

const Home = ({ signOutSuccess }) => {
    const [signingOut, setSigningOut] = useState(false)
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