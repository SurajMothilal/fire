import React, { useCallback } from 'react';
import NetworthHome from '../components/networth/NetworthHome';
import { screenNames } from '../constants';

const NvNetworthHome = ({ navigation, route }) => {
    const locale = route?.params?.locale
    return (
        <NetworthHome locale={locale} />
    )
}

export default NvNetworthHome