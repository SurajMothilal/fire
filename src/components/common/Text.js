import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { spacing, colors, fontSize, fontFamily } from '../../constants';

const Text = ({ title, style }) => {
    return <RNText style={{ ...styles.text, ...style }}>{title}</RNText>
}

const styles = StyleSheet.create({
    text: {
        fontSize: fontSize.small,
        color: colors.black,
        marginLeft: spacing.xlight,
        fontFamily: fontFamily.default
    }
})

export default Text;