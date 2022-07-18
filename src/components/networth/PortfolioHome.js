import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Text from '../common/Text'
import ScreenHeader from '../common/ScreenHeader'
import { queries } from '../../services/graphqlQueryBuilder'
import { sectionHeaders, values, icons, spacing, fontFamily, fontSize, fontWeight, colors, timeRanges, buttonNames, fireTypes } from '../../constants'
import PortfolioGrowthChart from './PortfolioGrowthChart'
import Tabs from '../common/Tabs'
import FormattedCurrency from '../common/FormattedCurrency'
import PortfolioHistory from './PortfolioHistory'
import { calculateTargetNetworths } from '../../services/financeHelper'
import Button from '../common/Button'
import { useQuery } from '@apollo/client'

const PortfolioHome = ({ onAddFireProfile }) => {
    const { loading, error, data, refetch } = useQuery(
        queries.getUserAccounts(),
        { variables: { userId: 'b13340b4-d3c6-427c-ad74-1d9046d199d9' } }
    )
    
    const onTopTabPress = (selectedTab) => {
        console.log(selectedTab)
    }

    const onChartFilterPress = (selectedTab) => {
        console.log(selectedTab)
    }
    console.log(data)
    const userFireProfile = data && data.getUserAccounts

    const leftButtonProps = {
        variant: values.icon,
        iconName: icons.filter,
        handlePress: () => null
    }

    const rightButtonProps = {
        variant: values.icon,
        iconName: icons.add,
        handlePress: () => null()
    }

    const DATA = [
        {x: 1, y: 2, label: ''},
        {x: 2, y: 3500, label: ''},
        {x: 3, y: 30000, label: ''},
        {x: 4, y: 20000, label: ''},
        {x: 5, y: 2, label: ''},
        {x: 6, y: 3500, label: ''},
        {x: 7, y: 30000, label: ''},
        {x: 8, y: 20000, label: ''},
    ]

    const tabData = [fireTypes.fat, fireTypes.lean]
    const selectedTab = fireTypes.fat

    const filterTabs = [timeRanges.day, timeRanges.week, timeRanges.month, timeRanges.quarter, timeRanges.year, timeRanges.all]
    const selectedTimeRange = timeRanges.year

    const portfolioHistory = [
        {
            timestamp: '1656785503496',
            investmentPercentage: 30,
            cashPercentage: 50.12,
            cash: 2000.12,
            investments: 600000.12,
            portfolioValue: 10040.12
        },
        {
            timestamp: '1656785503496',
            investmentPercentage: 30,
            cashPercentage: 50,
            cash: 2000.12,
            investments: 6000.12,
            portfolioValue: 1210000.12
        }
    ]

    console.log(userFireProfile)

    if (!userFireProfile) {
        return (
            <View style={styles.emptyContainer}>
                <Text title="Lets get started on your journey to financial independence!" style={styles.emptyText}/>
                <Button title={buttonNames.getStarted} handlePress={() => onAddFireProfile()} />
            </View>
        )
    }
    const today = new Date
    let currentNetWorth = 200.12
    let eta = 4
    let targetPortfolioValue

    if (userFireProfile?.fireType === fireTypes.traditional) {
        const calcuatedTargetFireNumbers = calculateTargetNetworths(
            userFireProfile.targetYearlyExpense,
            userFireProfile.targetYear,
            today.getFullYear(),
            1990
        )

        targetPortfolioValue = calcuatedTargetFireNumbers[selectedTab]
    }

    return (
        <SafeAreaView>
            <ScreenHeader title={sectionHeaders.portfolioSummary} leftButtonProps={leftButtonProps} rightButtonProps={rightButtonProps} />
            <View style={styles.tabContainer}>
                <Tabs data={tabData} selectedTab={selectedTab} onPress={onTopTabPress} />
            </View>
            <View style={styles.graphInfoContainer}>
                <View>
                    <Text title={sectionHeaders.current} style={styles.totalTitle} />
                    <FormattedCurrency value={currentNetWorth} style={styles.total} />
                </View>
                <View>
                    <Text title={sectionHeaders.fireEta} style={styles.totalTitle} />
                    <Text title={eta} style={styles.total} />
                </View>
                <View>
                    <Text title={sectionHeaders.target} style={styles.totalTitle} />
                    <FormattedCurrency value={targetPortfolioValue} style={styles.total} />
                </View>
            </View>
            <PortfolioGrowthChart data={DATA} />
            <View style={styles.tabContainer}>
                <Tabs type="fixed" data={filterTabs} selectedTab={selectedTimeRange} onPress={onChartFilterPress} />
            </View>
            <PortfolioHistory data={portfolioHistory} selectedTimeRange={selectedTimeRange} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    emptyText: {
        textAlign: 'center',
        fontFamily: fontFamily.default,
        fontSize: fontSize.medium,
        marginBottom: spacing.medium
    },
    tabContainer: {
        marginTop: spacing.xlight
    },
    graphInfoContainer: {
        paddingVertical: spacing.xlight,
        marginBottom: spacing.light,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: spacing.light,
    },
    totalTitle: {
        textAlign: 'center',
        fontFamily: fontFamily.default,
        fontSize: fontSize.xsmall,
        color: colors.black,
        marginBottom: spacing.xxlight / 2,
        opacity: 0.9
    },
    total: {
        textAlign: 'center',
        fontWeight: fontWeight.bold,
        fontFamily: fontFamily.default
    }
})

export default PortfolioHome