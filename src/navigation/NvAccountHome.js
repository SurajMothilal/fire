import React, { useCallback } from 'react';
import AccountHome from '../components/accounts/AccountHome';
import { screenNames } from '../constants';

const NvAccountHome = ({ navigation, route }) => {
    const locale = route?.params?.locale
    return (
        <AccountHome locale={locale} />
    )
}

export default NvAccountHome