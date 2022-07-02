import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import Text from '../common/Text'
import { useFocusEffect } from '@react-navigation/native'
import AccountList from './AccountList'
import { localQueries, queries } from '../../services/graphqlQueryBuilder'
import { useQuery } from '@apollo/client'
import { accountTypes, spacing, colors, fontSize, fontFamily, fontWeight, sectionHeaders, values, icons, buttonNames } from '../../constants'
import AccountPie from './AccountPie'
import Button from '../common/Button'
import ScreenHeader from '../common/ScreenHeader'
import AccountDot from '../common/AccountDot'
import LineDivider from '../common/LineDivider'
import Pill from '../common/Pill'
import FormattedCurrency from '../common/FormattedCurrency'

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
        cashTotal: 0,
        investmentTotal: 0,
        debtTotal: 0,
        investmentPercentage: 0,
        cashPercentage: 0,
        debtPercentage: 0
    })
    const accountsForUser = data && data.accountsForUser
    // const [selectedTimeline, setSelectedTimeline] = useState(timeline.thisWeek)

    const handleAccountAdd = useCallback(() => {
        onAddAccount(refetch)
    })

    const handleAccountPress = useCallback((item) => {
        onAddAccount(refetch, item)
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
                total: (investmentTotal + cashTotal) - debtTotal,
                cashTotal,
                investmentTotal,
                debtTotal,
                investmentPercentage: Math.round((investmentTotal * 100) / total),
                cashPercentage: Math.round((cashTotal * 100) / total),
                debtPercentage: Math.round((debtTotal * 100) / total)
            })
        }
    }, [accountsForUser, data])

    const noAccountsFround = accountsForUser && accountsForUser.length === 0

    if (noAccountsFround) {
        return (
            <View style={styles.emptyContainer}>
                <Text title="You have no accounts. Add one to get started!" style={styles.emptyText}/>
                <Button title={buttonNames.addAccount} handlePress={() => handleAccountAdd()} />
            </View>
        )
    }

    return (
        <SafeAreaView>
            <ScreenHeader title={sectionHeaders.accounts} leftButtonProps={leftButtonProps} rightButtonProps={rightButtonProps} />
            {/* <AccountPie investment={totals.investmentPercentage} cash={totals.cashPercentage} debt={totals.debtPercentage} /> */}
            <View style={styles.netWorthContainer}>
                <View style={styles.totalTextContainer}>
                    <Pill text={sectionHeaders.netWorth.toUpperCase()} color={colors.orange} />
                    <FormattedCurrency style={styles.netWorthText} value={totals.total} />
                </View>
            </View>
            <View style={styles.totalContainer}>
                <View style={styles.totalTextContainer}>
                    <Pill text={sectionHeaders[accountTypes.cash].toUpperCase()} color={colors.green} />
                    <FormattedCurrency style={styles.totalText} value={totals.cashTotal} />
                </View>
                <View style={styles.totalTextContainer}>
                    <Pill text={sectionHeaders[accountTypes.investment].toUpperCase()} color={colors.purple} />
                    <FormattedCurrency style={styles.totalText} value={totals.investmentTotal} />
                </View>
                <View style={styles.totalTextContainer}>
                    <Pill text={sectionHeaders[accountTypes.debt].toUpperCase()} color={colors.red} />
                    <FormattedCurrency style={styles.totalText} value={totals.debtTotal} />
                </View>
            </View>
            <AccountList data={accountsForUser} handleAccountAdd={handleAccountAdd} onAccountPress={handleAccountPress} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: spacing.light
    },
    emptyText: {
        textAlign: 'center',
        fontFamily: fontFamily.default,
        fontSize: fontSize.medium,
        marginBottom: spacing.medium
    },
    netWorthContainer: {
        justifyContent: 'center',
        paddingHorizontal: spacing.xlarge,
        paddingVertical: spacing.xlarge,
        backgroundColor: colors.black,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xlarge,
        paddingBottom: spacing.xlarge,
        backgroundColor: colors.black,
    },
    netWorthHeader:{
        fontWeight: fontWeight.bold,
        textAlign: 'center',
        fontSize: fontSize.xsmallyep,
        color: colors.grey
    },
    totalTextHeader:{
        fontWeight: fontWeight.bold,
        textAlign: 'left',
        fontSize: fontSize.xsmall,
        color: colors.grey
    },
    totalTextContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    rowContainer: {
        flexDirection: 'row'
    },
    totalText: {
        color: colors.white,
        fontSize: fontSize.medium,
        textAlign: 'center',
        marginTop: spacing.xlight,
        fontWeight: fontWeight.bold,
    },
    netWorthText: {
        color: colors.white,
        fontSize: fontSize.xxlarge,
        textAlign: 'center',
        marginTop: spacing.xlight,
        fontWeight: fontWeight.bold,
    },
    textTitle: {
        fontWeight: fontWeight.bold,
        fontSize: fontSize.medium,
        fontFamily: fontFamily.default,
        textAlign: 'center',
        color: colors.grey,
        marginTop: spacing.small
    }
})

export default AccountHome