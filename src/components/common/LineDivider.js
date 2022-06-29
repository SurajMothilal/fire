import React from 'react'
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../constants';

const LineDivider = ({ color }) => {
    const finalStyle = {
        ...styles.style,
        ...(color && { borderColor: color })
    }
    return (
        <View style={finalStyle} />
    )
}

const styles = StyleSheet.create({
    style: {
        borderBottomWidth: 1,
        borderColor: colors.lightgrey
    }
})

export default LineDivider