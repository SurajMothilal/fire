import React, { useCallback } from 'react';
import AddAccount from '../components/accounts/AddAccount'
import { screenNames } from '../constants';

const NvAddAccount = ({ navigation, route }) => {
    const locale = route?.params?.locale
    const refetchAccounts = route?.params?.refetchAccounts
    const handleBack = useCallback(() => {
        refetchAccounts()
        navigation.goBack()
    })

    return (
        <AddAccount locale={locale} onBack={handleBack} />
    )
}

export default NvAddAccount