import React from "react"
import { VictoryPie } from "victory-native"
import { colors } from "../../constants"

const AccountPie = ({
    investment = 0,
    cash = 0,
    debt = 0,
    height = 250,
    width = 250,
    innerRadius = 60,
    cornerRadius = 5,
    padAngle = 4,
    radius = 30,
    colorScale = [ colors.green, colors.purple, colors.red ]
}) => {
    let finalPadAngle = padAngle
    const totalArray = [investment, cash, debt].filter((item) => item === 0)
    if (totalArray.length > 1) {
        finalPadAngle = 0
    }
    return (
        <VictoryPie
            innerRadius={innerRadius}
            cornerRadius={cornerRadius}
            padAngle={finalPadAngle}
            labels={() => null}
            radius={radius}
            colorScale={colorScale}
            height={height}
            width={width}
            data={[
                { x: `${cash}%`, y: cash },
                { x: `${investment}%`, y: investment },
                { x: `${debt}%`, y: debt }
            ]}
        />     
    )
}

export default AccountPie