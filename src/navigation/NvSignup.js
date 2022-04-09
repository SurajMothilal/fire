import React, { useCallback } from 'react';
import SignUp from '../components/authentication/SignUp';
import { screenNames } from '../constants';

const NvSignup = ({ navigation }) => {
    const handleCancel = useCallback(() => navigation.goBack())
    const handleSuccess = useCallback((email) => navigation.navigate(screenNames.signupconfirmation, { email }))
    return (
        <SignUp handleCancel={handleCancel} handleSuccess={handleSuccess}/>
    )
}

export default NvSignup