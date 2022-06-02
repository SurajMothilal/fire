import React from 'react'
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../constants';

const LineDivider = () => {
    return (
        <View style={styles.style} />
    )
}

const styles = StyleSheet.create({
    style: {
        borderBottomWidth: 1,
        borderColor: colors.lightgrey,
        marginHorizontal: spacing.light,
        marginTop: spacing.light
    }
})

export default LineDivider