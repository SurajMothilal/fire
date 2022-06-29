import React from 'react'
import { SectionList, TouchableHighlight, View, StyleSheet } from 'react-native'
import Text from '../../components/common/Text'
import SectionTitle from '../common/SectionTitle';
import { accountTypes, spacing, sectionHeaders, fontSize } from '../../constants';
import AccountDot from '../common/AccountDot';
import FormattedCurrency from '../common/FormattedCurrency';

const renderItem = ({ item }) => {
    return (
        <TouchableHighlight onPress={() => console.log('her')}>
            <View style={styles.itemContainer}>
                <AccountDot type={item.type} />
                <View style={styles.textFields}>
                    <Text title={item.name} style={styles.textStyle} />
                    <FormattedCurrency style={styles.textStyle} value={parseFloat(item.balance).toFixed(2)} />
                </View>
            </View>
        </TouchableHighlight>
    )
  };

const AccountList = ({data = []}) => {
    const investments = data.filter((dataPoint) =>  dataPoint.type === accountTypes.investment)
    const cash = data.filter((dataPoint) =>  dataPoint.type === accountTypes.cash)
    const debt = data.filter((dataPoint) =>  dataPoint.type === accountTypes.debt)
    const updatedData = []
    if (investments.length) {
        updatedData.push({
            title: accountTypes.investment,
            data: investments
        })
    }
    if (cash.length) {
        updatedData.push({
            title: accountTypes.cash,
            data: cash
        })
    }
    if (debt.length) {
        updatedData.push({
            title: accountTypes.debt,
            data: debt
        })
    }

    return (
        <SectionList
            sections={updatedData}
            renderItem={renderItem}
            stickySectionHeadersEnabled={false}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section: { title } }) => (
                <SectionTitle title={sectionHeaders[title].toUpperCase()} style={styles.listSections} />
            )}
        />
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        margin: spacing.xxlight,
        paddingHorizontal: spacing.light,
        paddingVertical: spacing.xlight,
    },
    textFields: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    listSections: {
        textAlign: 'left'
    },
    textStyle: {
        fontSize: fontSize.medium
    },
    totalContainer: {
        marginHorizontal: spacing.medium,
        marginBottom: spacing.light,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default AccountList