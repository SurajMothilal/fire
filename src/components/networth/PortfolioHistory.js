import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import CommonScreenTitle from '../common/CommonScreenTitle'
import Text from '../common/Text'
import { sectionHeaders, values, icons, spacing, fontSize, timeRanges, fontFamily, fontWeight, colors, accountTypes } from '../../constants'
import { formattedDate } from '../../services/stringHelper'
import FormattedCurrency from '../common/FormattedCurrency'
import Icon from '../common/Icon'
import AccountDot from '../common/AccountDot'
import LineDivider from '../common/LineDivider'

const renderItem = (item, selectedTimeRange) => {
    let options
    if (selectedTimeRange === timeRanges.day) {
        options = { month: 'long', year: 'numeric', day: 'numeric' }
    } else if (selectedTimeRange === timeRanges.week) {
        options = { month: 'long', year: 'numeric', day: 'numeric' }
    } else if (selectedTimeRange === timeRanges.month) {
        options = { month: 'long', year: 'numeric', day: 'numeric' }
    } else if (selectedTimeRange === timeRanges.quarter) {
        options = { month: 'long', year: 'numeric', day: 'numeric' }
    } else if (selectedTimeRange === timeRanges.year) {
        options = { month: 'long', year: 'numeric' }
    } else {
        options = { month: 'long', year: 'numeric' }
    }

    const formattedTimestamp = formattedDate(item.timestamp, options)
    let portfolioChangeColor = colors.grey
    let portfolioChangeIcon
    if (item.portfolioChange > 0) {
        portfolioChangeColor = colors.green
        portfolioChangeIcon = icons.upCaret
    } else if (item.portfolioChange < 0) {
        portfolioChangeColor = colors.red
        portfolioChangeIcon = icons.downCaret
    }
    const networthChangeComponent = item.portfolioChange
        ?  <FormattedCurrency value={item.portfolioChange} style={{...styles.networthChangeEmpty, ...{ color: portfolioChangeColor }}} />
        :  <Text title="-" style={styles.networthChangeEmpty} />
    return (
        <View style={styles.itemContainer}>
            <View>
                <Text title={formattedTimestamp} style={styles.textStyle} />
                <View style={styles.networthSplitContainer}>
                    <View style={styles.networthSplit}>
                        <AccountDot type={accountTypes.cash} />
                        <FormattedCurrency value={item.cash} style={styles.networthSplitText} />
                        <Text title={`(${item.cashPercentage}%)`} style={styles.networthSplitText} />
                    </View>
                    <View style={styles.networthSplit}>
                        <AccountDot type={accountTypes.investment} />
                        <FormattedCurrency value={item.investments} style={styles.networthSplitText} />
                        <Text title={`(${item.investmentPercentage}%)`} style={styles.networthSplitText} />
                    </View>
                </View>
            </View>
            <View style={styles.chartContainer}>
                <View style={styles.networthContainer}>
                    <FormattedCurrency value={item.portfolioValue} style={styles.subTextStyle} />
                    <View style={styles.changeContainer}>
                        {portfolioChangeIcon && <Icon iconName={portfolioChangeIcon} size={fontSize.small} iconColor={portfolioChangeColor} />}
                        {networthChangeComponent}
                    </View>
                </View>
            </View>
        </View>
    )
}

const PortfolioHistory = ({ data, selectedTimeRange }) => {
    const updatedList = data.map((item, index) => {
        return {
            ...item,
            portfolioChange: index === 0 ? null : item.portfolioValue - data[index - 1].portfolioValue
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.listHeader}>
                <CommonScreenTitle title={sectionHeaders.history} />
            </View>
            <FlatList
                data={updatedList.reverse()}
                renderItem={({ item }) => renderItem(item, selectedTimeRange)}
                ItemSeparatorComponent={() => <View style={styles.dividerContainer}><LineDivider /></View>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.xxlight,
    },
    networthSplit: {
        flexDirection: 'row',
        marginTop: spacing.xxlight,
        marginRight: spacing.xxlight,
        marginLeft: spacing.xxlight,
    },
    networthSplitText: {
        fontSize: fontSize.small / 1.1,
        marginLeft: spacing.xxlight
    },
    networthSplitContainer: {
        flexDirection: 'row'
    },
    networthChangeEmpty: {
        fontSize: fontSize.small / 1.1,
        fontWeight: fontWeight.bold,
        color: colors.grey,
    },
    dividerContainer: {
        marginHorizontal: spacing.light
    },
    changeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.xxlight
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: spacing.xlight
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: spacing.xxlight,
        paddingHorizontal: spacing.xlight + spacing.xxlight,
        paddingVertical: spacing.xlight,
    },
    textStyle: {
        fontFamily: fontFamily.default,
        fontSize: fontSize.medium,
        marginBottom: spacing.xxlight
    },
    subTextStyle: {
        fontSize: fontSize.medium,
        marginBottom: spacing.xxlight
    },
    subTextContainer: {
        flexDirection: 'row'
    },
    networthContainer: {
        alignItems: 'flex-end'
    }
})

export default PortfolioHistory