import React, { useCallback } from 'react';
import AddFireProfile from '../components/networth/AddFireProfile'
import { screenNames } from '../constants';

const NvAddFireProfile = ({ navigation, route }) => {
    const locale = route?.params?.locale
    const handleBack = useCallback(() => {
        navigation.navigate(screenNames.portfolioHome)
    })
    return (
        <AddFireProfile locale={locale} onBack={handleBack} />
    )
}

export default NvAddFireProfile