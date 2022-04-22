import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import ScreenTitle from '../common/ScreenTitle'
import Button from '../common/Button'
import { queries } from '../../services/graphqlQueryBuilder'
import { useQuery } from '@apollo/client'
import { spacing, colors, fontSize, values } from '../../constants'

const AccountHome = ({ client }) => {
    const { loading, error, data } = useQuery(
        queries.getAccountsByUser(),
        { variables: { userId: "e5b4cea5-0950-4299-8852-6eb4b2c8b6cd" } }
    )
    console.log(data)
    const handleAccountAdd = useCallback(() => {
        console.log('add')
    })
    const handleAccountEdit = useCallback(() => {
        console.log('edit')
    })
    return (
        <>
            <View style={styles.headerContainer}>
                <Button
                    variant={values.link}
                    title="Edit"
                    handlePress={() => handleAccountEdit()}
                />
                <ScreenTitle title="Accounts" />
                <Button
                    variant={values.link}
                    title="Add"
                    handlePress={() => handleAccountAdd()}
                />
            </View> 
        </>
    )
}

const styles = StyleSheet.create({
    subText: {
        margin: spacing.medium,
        color: colors.black,
        fontSize: fontSize.medium,
        textAlign: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginHorizontal: spacing.medium
    }
})

export default AccountHome