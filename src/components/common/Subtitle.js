import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { spacing, colors, fontSize, fontWeight, fontFamily } from '../../constants'

const Subtitle = ({ title, style }) => {
    return <Text style={{ ...styles.title, ...style }}>{title}</Text>
}

const styles = StyleSheet.create({
    title: {
        fontWeight: fontWeight.bold,
        fontSize: fontSize.large,
        fontFamily: fontFamily.default,
        marginLeft: spacing.xlight,
        marginVertical: spacing.xlight,
        textAlign: 'center',
        color: colors.black,
    }
})

export default Subtitle;