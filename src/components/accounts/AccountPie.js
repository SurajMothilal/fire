import React from "react"
import { StyleSheet, View } from "react-native"
import { VictoryPie } from "victory-native"
import { colors } from "../../constants"

const AccountPie = () => {
    return (
        <VictoryPie
            innerRadius={80}
            cornerRadius={5}
            padAngle={4}
            labels={() => null}
            colorScale={[ colors.green, colors.purple, colors.red ]}
            height={300}
            data={[
                { x: "Cats", y: 35 },
                { x: "Dogs", y: 40 },
                { x: "Birds", y: 55 }
            ]}
        />
    )
}

export default AccountPie