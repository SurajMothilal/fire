import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import Subtitle from '../common/Subtitle'
import Button from '../common/Button'
import AccountList from './AccountList'
import { localQueries, queries } from '../../services/graphqlQueryBuilder'
import { useQuery } from '@apollo/client'
import { spacing, colors, fontSize, values } from '../../constants'

const AccountHome = ({ client }) => {
    const { data: loggedInUserObj } = useQuery(localQueries.loggedInUserId())
    const { loading, error, data } = useQuery(
        queries.getAccountsByUser(),
        { variables: { userId: loggedInUserObj.loggedInUserId }, skip: !loggedInUserObj }
    )
    const handleAccountAdd = useCallback(() => {
        console.log('add')
    })
    const handleAccountEdit = useCallback(() => {
        console.log('edit')
    })

    return (
        <>
           <View>
                <View style={styles.headerContainer}>
                    <Button
                        variant={values.link}
                        title="-"
                        handlePress={() => handleAccountEdit()}
                    />
                    <Subtitle title="Accounts" />
                    <Button
                        variant={values.link}
                        title="+"
                        handlePress={() => handleAccountAdd()}
                    />
                </View>
                <AccountList />
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