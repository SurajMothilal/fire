import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Text from '../common/Text'
import ScreenHeader from '../common/ScreenHeader'
import { sectionHeaders, values, icons, spacing, fontFamily, fontSize, fontWeight, colors, timeRanges } from '../../constants'
import NetworthChart from './NetworthChart'
import Tabs from '../common/Tabs'
import FormattedCurrency from '../common/FormattedCurrency'
import NetworthList from './NetworthList'

const NetworthHome = () => {
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

    const tabData = ['FatFIRE', 'LeanFIRE']
    const selectedTab = 'FatFIRE'

    const filterTabs = [timeRanges.day, timeRanges.week, timeRanges.month, timeRanges.quarter, timeRanges.year, timeRanges.all]
    const selectedTimeRange = timeRanges.year

    const networthHistory = [
        {
            timestamp: '1656785503496',
            investmentPercentage: 30,
            cashPercentage: 50.12,
            debtPercentage: 19.73,
            networth: 10040.12
        },
        {
            timestamp: '1656785503496',
            investmentPercentage: 30,
            cashPercentage: 50,
            debtPercentage: 20,
            networth: 1210060.12
        }
    ]

    return (
        <SafeAreaView>
            <ScreenHeader title={sectionHeaders.netWorth} leftButtonProps={leftButtonProps} rightButtonProps={rightButtonProps} />
            <View style={styles.tabContainer}>
                <Tabs data={tabData} selectedTab={selectedTab} />
            </View>
            <View style={styles.graphInfoContainer}>
                <View>
                    <Text title="Current" style={styles.totalTitle} />
                    <FormattedCurrency value={25000.12} style={styles.total} />
                </View>
                <View>
                    <Text title="Time to Target" style={styles.totalTitle} />
                    <Text title="4 Years" style={styles.total} />
                </View>
                <View>
                    <Text title="Target" style={styles.totalTitle} />
                    <FormattedCurrency value={1420000.32} style={styles.total} />
                </View>
            </View>
            <NetworthChart data={DATA} />
            <View style={styles.tabContainer}>
                <Tabs type="fixed" data={filterTabs} selectedTab={selectedTimeRange} />
            </View>
            <NetworthList data={networthHistory} selectedTimeRange={selectedTimeRange} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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

export default NetworthHome