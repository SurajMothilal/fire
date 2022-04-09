import React, { useCallback } from 'react';
import SignupConfirmation from '../components/authentication/SignupConfirmation';
import { screenNames } from '../constants';

const NvSignupConfirmation = ({ navigation, route }) => {
    const handleSuccess = useCallback(() => navigation.navigate(screenNames.login))
    return (
        <SignupConfirmation handleSuccess={handleSuccess} email={route?.params?.email} />
    )
}

export default NvSignupConfirmation