import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Text from '../common/Text'
import ScreenHeader from '../common/ScreenHeader'
import { sectionHeaders, values, icons, spacing, fontFamily, fontSize, fontWeight, colors } from '../../constants'
import NetworthChart from './NetworthChart'
import Tabs from '../common/Tabs'
import FormattedCurrency from '../common/FormattedCurrency'

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

    const filterTabs = ['1D', '1W', '1M', '3M', '1Y', 'ALL' ]
    const selectedFilterTab = '1W'

    return (
        <SafeAreaView>
            <ScreenHeader title={sectionHeaders.netWorth} leftButtonProps={leftButtonProps} rightButtonProps={rightButtonProps} />
            <View style={styles.tabContainer}>
                <Tabs data={tabData} selectedTab={selectedTab} />
            </View>
            <View style={styles.graphInfoContainer}>
                <View>
                    <Text title="Current" style={styles.totalTitle} />
                    <FormattedCurrency value="$25,001.23" style={styles.total} />
                </View>
                <View>
                    <Text title="Time to Fire" style={styles.totalTitle} />
                    <Text title="4 Years" style={styles.total} />
                </View>
                <View>
                    <Text title="Target" style={styles.totalTitle} />
                    <FormattedCurrency value="$25,001.23" style={styles.total} />
                </View>
            </View>
            <NetworthChart data={DATA} />
            <View style={styles.tabContainer}>
                <Tabs type="fixed" data={filterTabs} selectedTab={selectedFilterTab} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        marginBottom: spacing.xxlight,
        marginTop: spacing.xlight
    },
    graphInfoContainer: {
        paddingVertical: spacing.xlight,
        marginBottom: spacing.light,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: spacing.xlight
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