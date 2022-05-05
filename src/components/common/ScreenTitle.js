import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { spacing, colors, fontSize, fontWeight, fontFamily } from '../../constants';

const ScreenTitle = ({ title }) => {
    return <Text style={styles.title}>{title}</Text>
}

const styles = StyleSheet.create({
    title: {
        fontWeight: fontWeight.bold,
        fontSize: fontSize.xlarge,
        fontFamily: fontFamily.default,
        marginLeft: spacing.xlight,
        textAlign: 'left',
        color: colors.black,
        marginTop: spacing.xlarge
    }
})

export default ScreenTitle;