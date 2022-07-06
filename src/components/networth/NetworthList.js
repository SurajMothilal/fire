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
    let networthChangeColor = colors.grey
    let networthChangeIcon
    if (item.networthChange > 0) {
        networthChangeColor = colors.green
        networthChangeIcon = icons.upCaret
    } else if (item.networthChange < 0) {
        networthChangeColor = colors.red
        networthChangeIcon = icons.downCaret
    }
    const networthChangeComponent = item.networthChange
        ?  <FormattedCurrency value={item.networthChange} style={{...styles.networthChangeEmpty, ...{ color: networthChangeColor }}} />
        :  <Text title="-" style={styles.networthChangeEmpty} />
    return (
        <View style={styles.itemContainer}>
            <View>
                <Text title={formattedTimestamp} style={styles.textStyle} />
                <View style={styles.networthSplitContainer}>
                    <View style={styles.networthSplit}>
                        <AccountDot type={accountTypes.cash} />
                        <Text title={`${item.cashPercentage}%`} style={styles.networthSplitText} />
                    </View>
                    <View style={styles.networthSplit}>
                        <AccountDot type={accountTypes.investment} />
                        <Text title={`${item.investmentPercentage}%`} style={styles.networthSplitText} />
                    </View>
                    <View style={styles.networthSplit}>
                        <AccountDot type={accountTypes.debt} />
                        <Text title={`${item.debtPercentage}%`} style={styles.networthSplitText} />
                    </View>
                </View>
            </View>
            <View style={styles.chartContainer}>
                <View style={styles.networthContainer}>
                    <FormattedCurrency value={item.networth} style={styles.subTextStyle} />
                    <View style={styles.changeContainer}>
                        {networthChangeIcon && <Icon iconName={networthChangeIcon} size={fontSize.small} iconColor={networthChangeColor} />}
                        {networthChangeComponent}
                    </View>
                </View>
            </View>
        </View>
    )
}

const NetworthList = ({ data, selectedTimeRange }) => {
    const updatedList = data.map((item, index) => {
        return {
            ...item,
            networthChange: index === 0 ? null : item.networth - data[index - 1].networth
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.listHeader}>
                <CommonScreenTitle title={sectionHeaders.networthHistory} />
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
        marginTop: spacing.xxlight
    },
    networthSplitText: {
        marginRight: spacing.xlight,
        marginLeft: spacing.xxlight,
        fontSize: fontSize.small / 1.1
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

export default NetworthList