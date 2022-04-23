import React, { useCallback } from 'react';
import Login from '../components/authentication/Login';
import { screenNames } from '../constants';

const NvLogin = ({ navigation, route }) => {
    const handleSignUpPress = useCallback(() => navigation.navigate(screenNames.signup))
    const handleForgotPassword = useCallback(() => navigation.navigate(screenNames.forgotPassword))
    const handleUnconfirmedLogin = useCallback((email) => navigation.navigate(screenNames.signupconfirmation, { email }))
    const handleLoginSuccess = useCallback(() => navigation.navigate(screenNames.accountHome))
    const locale = route?.params?.locale
    return (
        <Login
            handleSignUpPress={handleSignUpPress}
            handleForgotPasswordPress={handleForgotPassword}
            handleUnconfirmedLogin={handleUnconfirmedLogin}
            handleLoginSuccess={handleLoginSuccess}
            locale={locale}
        />
    )
}

export default NvLogin