import React, { useCallback } from 'react';
import ForgotPasswordSubmit from '../components/authentication/ForgotPasswordSubmit';
import { screenNames } from '../constants';

const NvForgotPasswordSubmit = ({ navigation, route }) => {
    const locale = route?.params?.locale
    const handleSuccess = useCallback(() => navigation.navigate(screenNames.passwordResetSuccessful))
    const handleCancel = useCallback((email) => navigation.navigate(screenNames.forgotPassword, { email }))
    return (
        <ForgotPasswordSubmit handleSuccess={handleSuccess} handleCancel={handleCancel} locale={locale} email={route?.params?.email}  />
    )
}

export default NvForgotPasswordSubmit