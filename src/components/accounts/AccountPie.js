import React from "react"
import { StyleSheet, View } from "react-native"
import Text from '../common/Text'
import { VictoryPie } from "victory-native"
import { colors, fontSize, fontWeight } from "../../constants"

const AccountPie = ({ investment, cash, debt }) => {
    return (
        <View style={styles.container}>
            <View style={styles.meta}>
                <View style={styles.centerText}>
                    <Text style={styles.cash} title={cash} />
                    <Text style={styles.investment} title={investment} />
                    <Text style={styles.debt} title={debt}  />
                </View>
            </View>
            <VictoryPie
                innerRadius={85}
                cornerRadius={5}
                padAngle={4}
                labels={() => null}
                colorScale={[ colors.green, colors.purple, colors.red ]}
                height={300}
                width={300}
                data={[
                    { x: `${cash}%`, y: cash },
                    { x: `${investment}%`, y: investment },
                    { x: `${debt}%`, y: debt }
                ]}
            />
        </View>
     
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'relative'
    },
    centerText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cash: {
        color: colors.green,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.large
    },
    investment: {
        color: colors.purple,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.large
    },
    debt: {
        color: colors.red,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.large
    },
    divider: {
        color: colors.grey
    },
    meta: {
        position: 'absolute',
        top: '45.5%',
        right: 0,
        left: 0,
        right: 0,
    }
})

export default AccountPie