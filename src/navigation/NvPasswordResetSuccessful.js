import React, { useCallback } from 'react';
import PasswordResetSuccessful from '../components/authentication/PasswordResetSuccessful';
import { screenNames } from '../constants';

const NvPasswordResetSuccessful = ({ navigation, route }) => {
    const locale = route?.params?.locale
    const handleClick = useCallback(() => navigation.navigate(screenNames.login))
    return (
        <PasswordResetSuccessful handleClick={handleClick} locale={locale} />
    )
}

export default NvPasswordResetSuccessful