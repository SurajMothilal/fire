import React from 'react'
import { FlatList, TouchableHighlight, View, StyleSheet } from 'react-native'
import Text from '../../components/common/Text'
import { accountTypes, colors, spacing } from '../../constants';

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

const AccountList = () => {
    const DATA = [
        {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            name: "RBC Checking Account",
            type: 'investment',
            balance: 2012.12,
            currency: 'CAD'
        },
        {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            name: "TD Savings account",
            type: 'debt',
            balance: 12012.12,
            currency: 'CAD'
        },
        {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            name: "RBC",
            type: 'cash',
            balance: 2042.02,
            currency: 'CAD'
        },
    ];
    return (
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.lineSeparator} />}
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
    lineSeparator: {
        borderBottomColor: colors.lightgrey,
        borderBottomWidth: 1,
        marginHorizontal: spacing.xlight
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
    }
})

export default AccountList