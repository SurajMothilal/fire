import React, { useCallback } from 'react';
import PortfolioHome from '../components/networth/PortfolioHome';
import { screenNames } from '../constants';

const NvPortfolioHome = ({ navigation, route }) => {
    const locale = route?.params?.locale
    const onAddFireProfile = useCallback(() => navigation.navigate(screenNames.addFireProfile))
    return (
        <PortfolioHome locale={locale} onAddFireProfile={onAddFireProfile} />
    )
}

export default NvPortfolioHome