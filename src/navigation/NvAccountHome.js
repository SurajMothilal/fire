import React, { useCallback } from 'react';
import AccountHome from '../components/accounts/AccountHome';
import { screenNames } from '../constants';

const NvAccountHome = ({ navigation, route }) => {
    const locale = route?.params?.locale
    const handleAddAccount = useCallback((refetch, item) => navigation.navigate(screenNames.addAccount, { refetchAccounts: refetch, item }))
    return (
        <AccountHome locale={locale} onAddAccount={handleAddAccount} />
    )
}

export default NvAccountHome