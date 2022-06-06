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
                {leftButtonProps ? <Button {...leftButtonProps} /> : <View/> }
                <CommonScreenTitle title={title} style={styles.listSections} />
                {rightButtonProps ? <Button {...rightButtonProps} /> : <View/> }
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
    }
})

export default ScreenHeader