import React, { useCallback } from 'react';
import Login from '../components/authentication/Login';
import { screenNames } from '../constants';

const NvLogin = ({ navigation }) => {
    const handleSignUpPress = useCallback(() => navigation.navigate(screenNames.signup))
    return (
        <Login handleSignUpPress={handleSignUpPress} handleForgotPasswordPress={handleSignUpPress} />
    )
}

export default NvLogin