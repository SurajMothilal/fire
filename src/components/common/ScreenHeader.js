import React from 'react'
import { View, StyleSheet } from 'react-native'
import Button from '../common/Button'
import CommonScreenTitle from '../common/CommonScreenTitle'
import LineDivider from '../common/LineDivider'
import { spacing } from '../../constants'

const ScreenHeader = ({ title, leftButtonProps, rightButtonProps }) => {
    return (
        <>
            <View style={styles.headerContainer}>
                {leftButtonProps ? <Button {...leftButtonProps} /> : <View style={{ width: 25 }}/> }
                <CommonScreenTitle title={title} />
                {rightButtonProps ? <Button {...rightButtonProps} /> : <View style={{ width: 25 }}/> }
            </View>
            <LineDivider />
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginHorizontal: spacing.xlight,
        paddingBottom: spacing.light
    }
})

export default ScreenHeader