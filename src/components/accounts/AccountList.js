import React from 'react'
import { SectionList, TouchableHighlight, View, StyleSheet } from 'react-native'
import Text from '../../components/common/Text'
import SectionTitle from '../common/SectionTitle';
import { accountTypes, spacing, sectionHeaders, fontSize, values, icons } from '../../constants';
import AccountDot from '../common/AccountDot';
import CommonScreenTitle from '../common/CommonScreenTitle';
import Button from '../common/Button';
import FormattedCurrency from '../common/FormattedCurrency';

const renderItem = (item, onAccountPress) => {
    return (
        <TouchableHighlight onPress={() => onAccountPress(item)}>
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

const AccountList = ({data = [], handleAccountAdd, onAccountPress }) => {
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
        <View style={styles.container}>
            <View style={styles.listHeader}>
                <CommonScreenTitle title={sectionHeaders.myAccounts} />
                <Button variant={values.icon} iconName={icons.add} handlePress={handleAccountAdd} />
            </View>
            <SectionList
                sections={updatedData}
                renderItem={({ item }) => renderItem(item, onAccountPress)}
                stickySectionHeadersEnabled={false}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section: { title } }) => (
                    <SectionTitle title={sectionHeaders[title].toUpperCase()} style={styles.listSections} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.light,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: spacing.xlight
    },
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
        marginLeft: spacing.xlight
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