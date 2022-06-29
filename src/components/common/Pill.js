import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { colors, fontFamily, fontSize, fontWeight, spacing } from '../../constants'

const Pill = ({ text, color, textStyle }) => {
    const finalContainerStyle = {
        ...styles.container,
        ...{ backgroundColor: color }
    }
    return (
        <View style={finalContainerStyle}>
            <Text style={{...styles.text, ...textStyle}}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: spacing.xxlight,
        marginLeft: spacing.xlight,
    },
    text: {
        color: colors.white,
        marginHorizontal: spacing.xlight,
        fontSize: fontSize.xsmall,
        fontWeight: fontWeight.bold,
        fontFamily: fontFamily.default,
        textAlign: 'center'
    }
})

export default Pill