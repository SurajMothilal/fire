import React, { useState } from 'react'
import { SectionList, TouchableHighlight, View, StyleSheet } from 'react-native'
import Text from '../../components/common/Text'
import SectionTitle from '../common/SectionTitle';
import { accountTypes, colors, spacing, sectionHeaders } from '../../constants';

const renderItem = ({ item }) => {
    let backgroundColor
    if (item.type === accountTypes.cash) {
        backgroundColor = colors.green
    } else if (item.type === accountTypes.debt) {
        backgroundColor = colors.red
    } else if (item.type === accountTypes.investment) {
        backgroundColor = colors.purple
    }

    return (
        <TouchableHighlight onPress={() => console.log('her')}>
            <View style={styles.itemContainer}>
                <View title={item.type} style={{ ...styles.dot, ...{ backgroundColor } }} />
                <View style={styles.textFields}>
                    <Text title={item.name} />
                    <Text title={item.balance} />
                </View>
            </View>
        </TouchableHighlight>
    )
  };

const AccountList = ({data}) => {
    const investments = data.filter((dataPoint) =>  dataPoint.type === accountTypes.investment)
    const cash = data.filter((dataPoint) =>  dataPoint.type === accountTypes.cash)
    const debt = data.filter((dataPoint) =>  dataPoint.type === accountTypes.debt)
    const updatedData = []
    if (investments) {
        updatedData.push({
            title: accountTypes.investment,
            data: investments
        })
    }
    if (cash) {
        updatedData.push({
            title: accountTypes.cash,
            data: cash
        })
    }
    if (debt) {
        updatedData.push({
            title: accountTypes.debt,
            data: debt
        })
    }
    return (
        <>
           <SectionList
                sections={updatedData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section: { title } }) => (
                    <SectionTitle title={sectionHeaders[title].toUpperCase()} style={styles.listSections} />
                )}
            />
        </>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        margin: spacing.xxlight,
        paddingHorizontal: spacing.light,
        paddingVertical: spacing.xlight,
    },
    dot: {
        alignSelf: 'center',
        height: 10,
        width: 10,
        borderRadius: 20,
        marginRight: spacing.light
    },
    textFields: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    listSections: {
        textAlign: 'left'
    }
})

export default AccountList