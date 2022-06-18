import React, { useCallback } from 'react';
import AccountHome from '../components/accounts/AccountHome';
import { screenNames } from '../constants';

const NvAccountHome = ({ navigation, route }) => {
    const locale = route?.params?.locale
    const handleAddAccount = useCallback((refetch) => navigation.navigate(screenNames.addAccount, { refetchAccounts: refetch }))
    return (
        <AccountHome locale={locale} onAddAccount={handleAddAccount} />
    )
}

export default NvAccountHome