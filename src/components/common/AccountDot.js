import React from 'react'
import { View, StyleSheet } from 'react-native'
import { accountTypes, colors, spacing } from '../../constants';

const AccountDot = ({ type, style = {} }) => {
    let backgroundColor
    if (type === accountTypes.cash) {
        backgroundColor = colors.green
    } else if (type === accountTypes.debt) {
        backgroundColor = colors.red
    } else if (type === accountTypes.investment) {
        backgroundColor = colors.purple
    }

    return <View title={type} style={{ ...styles.dot, ...{ backgroundColor }, ...style }} />
}

const styles = StyleSheet.create({
    dot: {
        alignSelf: 'center',
        height: 8,
        width: 8,
        borderRadius: 20,
    }
})

export default AccountDot