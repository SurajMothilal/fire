import React from 'react'
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native'
import { colors, fontFamily, fontSize, fontWeight, spacing } from '../../constants'
import Text from './Text'

const renderItem = (item, selected, onPress) => {
    const itemSelected = selected === item
    return (
        <TouchableOpacity
            onPress={() => onPress(item)}
            style={{...styles.itemContainer, ...(itemSelected ? styles.selectedItemContainer : {})}}
        >
            <Text style={{...styles.item, ...(itemSelected ? styles.selectedItem : {})}} title={item} />
        </TouchableOpacity>
    )
}

const Tabs = ({ data, selectedTab, type, onPress }) => {
    if (type === "fixed") {
        return (
            <View style={styles.flatContainer}>
                {data.map((item) => {
                    const itemSelected = selectedTab === item
                    return (
                        <TouchableOpacity
                            onPress={() => onPress(item)}
                            style={{...styles.flatItemContainer, ...(itemSelected ? styles.selectedFlatItemContainer : {}) }}
                        >
                            <Text style={{...styles.item, ...(itemSelected ? styles.selectedFlatItem : {})}} title={item} />
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList horizontal={true} data={data} renderItem={({ item }) => renderItem(item, selectedTab, onPress)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: colors.white,
        borderColor: colors.black,
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: spacing.xxlight,
        paddingHorizontal: spacing.xlight,
        marginRight: spacing.xlight
    },
    selectedItemContainer: {
        backgroundColor: colors.black
    },
    item: {
        textAlign: 'center',
        fontFamily: fontFamily.default,
        fontSize: fontSize.xsmall
    },
    selectedItem: {
        color: colors.white
    },
    selectedFlatItem: {
        color: colors.white
    },
    container: {
        margin: spacing.xlight,
        alignItems: 'stretch'
    },
    flatContainer: {
        flexDirection: 'row',
        paddingVertical: spacing.light
    },
    flatItemContainer: {
        width: '16.66%',
        paddingVertical: spacing.xxlight + spacing.xxlight
    },
    selectedFlatItemContainer: {
        backgroundColor: colors.black
    }
})

export default Tabs