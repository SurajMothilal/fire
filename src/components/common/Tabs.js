import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { colors, fontFamily, fontSize, fontWeight, spacing } from '../../constants'
import Text from './Text'

const renderItem = (item, selected) => {
    const itemSelected = selected === item
    return (
        <View style={{...styles.itemContainer, ...(itemSelected ? styles.selectedItemContainer : {})}}>
            <Text style={{...styles.item, ...(itemSelected ? styles.selectedItem : {})}} title={item} />
        </View>
    )
}

const Tabs = ({ data, selectedTab, type }) => {
    if (type === "fixed") {
        return (
            <View style={styles.flatContainer}>
                {data.map((item) => {
                    const itemSelected = selectedTab === item
                    return (
                        <View style={{...styles.flatItemContainer, ...(itemSelected ? styles.selectedFlatItemContainer : {}) }}>
                            <Text style={{...styles.item, ...(itemSelected ? styles.selectedFlatItem : {})}} title={item} />
                        </View>
                    )
                })}
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList horizontal={true} data={data} renderItem={({ item }) => renderItem(item, selectedTab)}/>
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
        paddingRight: spacing.xlight,
        marginRight: spacing.xlight
    },
    selectedItemContainer: {
        backgroundColor: colors.black
    },
    item: {
        justifyContent: 'flex-start',
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
        paddingVertical: spacing.light,
        justifyContent: 'center'
    },
    flatItemContainer: {
        paddingHorizontal: spacing.light,
        paddingVertical: spacing.xxlight + spacing.xxlight
    },
    selectedFlatItemContainer: {
        backgroundColor: colors.black
    }
})

export default Tabs