import React, { useCallback } from 'react';
import Home from '../components/Home'
import { screenNames } from '../constants';

const NvHome = ({ navigation, route }) => {
    const locale = route?.params?.locale
    const signOutSuccess = useCallback(() => navigation.navigate(screenNames.login))
    return (
        <Home signOutSuccess={signOutSuccess} locale={locale}/>
    )
}

export default NvHome