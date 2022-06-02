import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import CommonScreenTitle from '../common/CommonScreenTitle'
import Button from '../common/Button'
import LineDivider from '../common/LineDivider'
import AccountList from './AccountList'
import { localQueries, queries } from '../../services/graphqlQueryBuilder'
import { useQuery } from '@apollo/client'
import { accountTypes, spacing, colors, fontSize, sectionHeaders, values, icons } from '../../constants'
import AccountPie from './AccountPie'

const AccountHome = ({ client }) => {
    const { data: loggedInUserObj } = useQuery(localQueries.loggedInUserId())
    const { loading, error, data } = useQuery(
        queries.getAccountsByUser(),
        { variables: { userId: loggedInUserObj.loggedInUserId }, skip: !loggedInUserObj }
    )
    const [totals, setTotals] = useState({
        total: 0,
        investmentPercentage: 0,
        cashPercentage: 0,
        debtPercentage: 0
    })
    const DATA = [
        {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            name: "RBC Checking Account",
            type: accountTypes.investment,
            balance: 2012.12,
            currency: 'CAD'
        },
        {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            name: "TD Savings account",
            type: accountTypes.debt,
            balance: 12012.12,
            currency: 'CAD'
        },
        {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            name: "RBC",
            type: accountTypes.cash,
            balance: 2042.02,
            currency: 'CAD'
        },
        {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f64",
            name: "TD Savings account",
            type: accountTypes.debt,
            balance: 12612.12,
            currency: 'CAD'
        },
        {
            id: "58694a0f-3da1-471f-bd96-145571e29d7x",
            name: "RBC",
            type: accountTypes.cash,
            balance: 2242.02,
            currency: 'CAD'
        },
    ];

    const handleAccountAdd = useCallback(() => {
        console.log('add')
    })
    const handleAccountEdit = useCallback(() => {
        console.log('edit')
    })


    useEffect(() => {
        const total = DATA.reduce((acc, current) => acc + current.balance, 0)
        const investments = DATA.filter((account) => account.type === accountTypes.investment)
        const cash = DATA.filter((account) => account.type === accountTypes.cash)
        const debt = DATA.filter((account) => account.type === accountTypes.debt)
        let investmentTotal = 0
        let cashTotal = 0
        let debtTotal = 0
        if (investments) {
            investmentTotal = investments.reduce((acc, current) => acc + current.balance, 0)
        }
        if (cash) {
            cashTotal = cash.reduce((acc, current) => acc + current.balance, 0)
        }
        if (debt) {
            debtTotal = debt.reduce((acc, current) => acc + current.balance, 0)
        }
        setTotals({
            total,
            investmentPercentage: Math.round((investmentTotal * 100) / total),
            cashPercentage: Math.round((cashTotal * 100) / total),
            debtPercentage: Math.round((debtTotal * 100) / total)
        })
    }, [])
    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Button
                    variant={values.icon}
                    iconName={icons.filter}
                    handlePress={() => null}
                />
                <CommonScreenTitle title={sectionHeaders.accounts} style={styles.listSections} />
                <Button
                    variant={values.icon}
                    iconName={icons.add}
                    handlePress={() => null}
                />
            </View>
            <LineDivider />
            <AccountPie investment={totals.investmentPercentage} cash={totals.cashPercentage} debt={totals.debtPercentage} />
            <AccountList data={DATA}/>
        </SafeAreaView>
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
        marginHorizontal: spacing.xlight,
    },
    pieContainer: {
    }
})

export default AccountHome