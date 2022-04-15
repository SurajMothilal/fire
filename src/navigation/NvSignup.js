import React, { useCallback } from 'react';
import SignUp from '../components/authentication/SignUp';
import { screenNames } from '../constants';

const NvSignup = ({ navigation, route }) => {
    const handleCancel = useCallback(() => navigation.goBack())
    const handleSuccess = useCallback((email) => navigation.navigate(screenNames.signupconfirmation, { email }))
    const locale = route?.params?.locale
    return (
        <SignUp handleCancel={handleCancel} handleSuccess={handleSuccess} locale={locale} />
    )
}

export default NvSignup