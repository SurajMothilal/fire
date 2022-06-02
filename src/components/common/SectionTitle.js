import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { spacing, colors, fontSize, fontWeight, fontFamily } from '../../constants'

const SectionTitle = ({ title, style }) => {
    return <Text style={{ ...styles.title, ...style }}>{title}</Text>
}

const styles = StyleSheet.create({
    title: {
        fontWeight: fontWeight.bold,
        fontSize: fontSize.xsmall,
        fontFamily: fontFamily.default,
        marginLeft: spacing.xlight,
        marginVertical: spacing.xlight,
        textAlign: 'center',
        color: colors.grey,
    }
})

export default SectionTitle;