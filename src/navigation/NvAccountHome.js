import React, { useCallback } from 'react';
import AccountHome from '../components/accounts/AccountHome';
import { screenNames } from '../constants';

const NvAccountHome = ({ navigation, route }) => {
    const locale = route?.params?.locale
    const handleAddAccount = useCallback(() => navigation.navigate(screenNames.addAccount))
    return (
        <AccountHome locale={locale} onAddAccount={handleAddAccount} />
    )
}

export default NvAccountHome