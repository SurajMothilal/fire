import React, { useCallback } from 'react';
import Login from '../components/authentication/Login';
import { screenNames } from '../constants';

const NvLogin = ({ navigation, route }) => {
    const handleSignUpPress = useCallback(() => navigation.navigate(screenNames.signup))
    const handleUnconfirmedLogin = useCallback((email) => navigation.navigate(screenNames.signupconfirmation, { email }))
    const handleLoginSuccess = useCallback(() => navigation.navigate(screenNames.home))
    const locale = route?.params?.locale
    return (
        <Login
            handleSignUpPress={handleSignUpPress}
            handleForgotPasswordPress={handleSignUpPress}
            handleUnconfirmedLogin={handleUnconfirmedLogin}
            handleLoginSuccess={handleLoginSuccess}
            locale={locale}
        />
    )
}

export default NvLogin