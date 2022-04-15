import React, { useCallback } from 'react';
import SignupConfirmation from '../components/authentication/SignupConfirmation';
import { screenNames } from '../constants';

const NvSignupConfirmation = ({ navigation, route }) => {
    const locale = route?.params?.locale
    const handleSuccess = useCallback(() => navigation.navigate(screenNames.home))
    return (
        <SignupConfirmation handleSuccess={handleSuccess} email={route?.params?.email} locale={locale} />
    )
}

export default NvSignupConfirmation