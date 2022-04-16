import React, { useCallback } from 'react';
import ForgotPassword from '../components/authentication/ForgotPassword';
import { screenNames } from '../constants';

const NvForgotPassword = ({ navigation, route }) => {
    const locale = route?.params?.locale
    const handleSuccess = useCallback((email) => navigation.navigate(screenNames.forgotPasswordSubmit, { email }))
    const handleCancel = useCallback(() => navigation.goBack())
    return (
        <ForgotPassword handleSuccess={handleSuccess} handleCancel={handleCancel} locale={locale} />
    )
}

export default NvForgotPassword