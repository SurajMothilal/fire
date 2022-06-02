import React from "react"
import { StyleSheet, View } from "react-native"
import Text from '../common/Text'
import { VictoryPie } from "victory-native"
import SectionTitle from "../common/SectionTitle"
import { colors, fontSize, fontWeight, sectionHeaders, spacing } from "../../constants"
import { calculateSavingsRatePercentage } from "../../services/financeHelper"

const AccountPie = ({ investment, cash, debt }) => {
    return (
        <View style={styles.container}>
            <View style={styles.meta}>
                <View style={styles.centerText}>
                    <Text style={styles.cash} title={calculateSavingsRatePercentage(cash, investment, debt)} />
                    <SectionTitle title={sectionHeaders.savingsRate.toUpperCase()} style={styles.savingsRate} />
                </View>
            </View>
            <VictoryPie
                innerRadius={95}
                cornerRadius={5}
                padAngle={4}
                labels={() => null}
                colorScale={[ colors.green, colors.purple, colors.red ]}
                height={310}
                width={310}
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
        marginTop: spacing.medium,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cash: {
        color: colors.black,
        fontWeight: fontWeight.bold,
        fontSize: fontSize.xxlarge,
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
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    savingsRate: {
        color: colors.grey
    }
})

export default AccountPie