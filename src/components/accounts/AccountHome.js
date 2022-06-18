import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import AccountList from './AccountList'
import { localQueries, queries } from '../../services/graphqlQueryBuilder'
import { useQuery } from '@apollo/client'
import { accountTypes, spacing, colors, fontSize, sectionHeaders, values, icons } from '../../constants'
import AccountPie from './AccountPie'
import ScreenHeader from '../common/ScreenHeader'

const AccountHome = ({ onAddAccount }) => {
    // const { data: loggedInUserObj } = useQuery(localQueries.loggedInUserId())
    // const { loading, error, data } = useQuery(
    //     queries.getAccountsByUser(),
    //     { variables: { userId: loggedInUserObj.loggedInUserId }, skip: !loggedInUserObj }
    // )
    const { loading, error, data, refetch } = useQuery(
        queries.getAccountsByUser(),
        { variables: { userId: 'b13340b4-d3c6-427c-ad74-1d9046d199d9' } }
    )
    const [totals, setTotals] = useState({
        total: 0,
        investmentPercentage: 0,
        cashPercentage: 0,
        debtPercentage: 0
    })
    const accountsForUser = data && data.accountsForUser
    // const [selectedTimeline, setSelectedTimeline] = useState(timeline.thisWeek)

    const handleAccountAdd = useCallback(() => {
        onAddAccount(refetch)
    })
    const handleAccountEdit = useCallback(() => {
        console.log('edit')
    })

    const leftButtonProps = {
        variant: values.icon,
        iconName: icons.filter,
        handlePress: () => null
    }

    const rightButtonProps = {
        variant: values.icon,
        iconName: icons.add,
        handlePress: () => handleAccountAdd()
    }

    useEffect(() => {
        if (accountsForUser) {
            const total = accountsForUser.reduce((acc, current) => acc + current.balance, 0)
            const investments = accountsForUser.filter((account) => account.type === accountTypes.investment)
            const cash = accountsForUser.filter((account) => account.type === accountTypes.cash)
            const debt = accountsForUser.filter((account) => account.type === accountTypes.debt)
            let investmentTotal = 0
            let cashTotal = 0
            let debtTotal = 0
            if (investments.length) {
                investmentTotal = investments.reduce((acc, current) => acc + current.balance, 0)
            }
            if (cash.length) {
                cashTotal = cash.reduce((acc, current) => acc + current.balance, 0)
            }
            if (debt.length) {
                debtTotal = debt.reduce((acc, current) => acc + current.balance, 0)
            }
            setTotals({
                total,
                investmentPercentage: Math.round((investmentTotal * 100) / total),
                cashPercentage: Math.round((cashTotal * 100) / total),
                debtPercentage: Math.round((debtTotal * 100) / total)
            })
        }
    }, [accountsForUser, data])
    return (
        <SafeAreaView>
            <ScreenHeader title={sectionHeaders.accounts} leftButtonProps={leftButtonProps} rightButtonProps={rightButtonProps} />
            {/* <ScrollView style={styles.timeline} showsHorizontalScrollIndicator={false} horizontal>
                <Button
                    variant={values.primaryGrey}
                    title={timeline.year}
                    handlePress={() => handleForgotPasswordPress()}
                    textStyle={styles.timelineButtonText}
                />
                <Button
                    variant={values.primaryGrey}
                    title={timeline.semiYear}
                    handlePress={() => handleForgotPasswordPress()}
                    textStyle={styles.timelineButtonText}
                />
                <Button
                    variant={values.primaryGrey}
                    title={timeline.lastMonth}
                    handlePress={() => handleForgotPasswordPress()}
                    textStyle={styles.timelineButtonText}
                />
                <Button
                    variant={values.primaryGrey}
                    title={timeline.thisWeek}
                    handlePress={() => handleForgotPasswordPress()}
                    textStyle={styles.timelineButtonText}
                />
            </ScrollView> */}
            <AccountPie investment={totals.investmentPercentage} cash={totals.cashPercentage} debt={totals.debtPercentage} />
            <AccountList data={accountsForUser}/>
        </SafeAreaView>
    )
}

// const styles = StyleSheet.create({
//     subText: {
//         margin: spacing.medium,
//         color: colors.black,
//         fontSize: fontSize.medium,
//         textAlign: 'center'
//     },
//     timeline: {
//         flexDirection: 'row'
//     },
//     timelineButtonText: {
//         fontSize: fontSize.xsmall
//     }
// })

export default AccountHome