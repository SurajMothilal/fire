import React from "react"
import { StyleSheet, View } from "react-native"
import Text from '../common/Text'
import { VictoryPie } from "victory-native"
import SectionTitle from "../common/SectionTitle"
import { colors, fontSize, fontWeight, sectionHeaders, spacing } from "../../constants"
import { calculateSavingsRatePercentage } from "../../services/financeHelper"

const AccountPie = ({ investment = 0, cash = 0, debt = 0 }) => {
    let padAngle = 4
    const totalArray = [investment, cash, debt].filter((item) => item === 0)
    if (totalArray.length > 1) {
        padAngle = 0
    }
    return (
        <View style={styles.container}>
            {/* <View style={styles.meta}>
                <View style={styles.centerText}>
                    <Text style={styles.cash} title={calculateSavingsRatePercentage(cash, investment)} />
                    <SectionTitle title={sectionHeaders.savingsRate.toUpperCase()} style={styles.savingsRate} />
                </View>
            </View> */}
            <VictoryPie
                innerRadius={60}
                cornerRadius={5}
                padAngle={padAngle}
                labels={() => null}
                colorScale={[ colors.green, colors.purple, colors.red ]}
                height={250}
                width={250}
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
        position: 'relative',
        flexDirection: 'row'
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