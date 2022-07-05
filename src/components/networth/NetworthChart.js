import React from 'react'
import { StyleSheet } from 'react-native'
import { VictoryLine, VictoryGroup, VictoryTooltip, VictoryVoronoiContainer, VictoryScatter, VictoryStack } from 'victory-native'
import { View } from 'react-native'
import { colors, fontSize } from '../../constants'

const NetworthChart = ({ data }) => {
    return (
        <View style={styles.container}>
            <VictoryGroup
                domainPadding={{ y: 10, x: 5 }}
                animate={{
                    duration: 1000
                }}
                padding={{ top: 0, bottom: 0, right: 10, left: 10 }}
                height={250}
                containerComponent={
                    <VictoryVoronoiContainer label={d => `${d.label}`} />
                }
            >
                <VictoryStack>
                    <VictoryLine
                        labelComponent={(
                            <VictoryTooltip
                                flyoutStyle={{
                                    stroke: colors.black,
                                    fill: colors.white
                                }}
                                pointerLength={0}
                            />
                        )}
                        interpolation="linear"
                        style={{
                            data: { stroke: colors.purple }
                        }}
                        data={data}
                    />
                </VictoryStack>
            </VictoryGroup>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white
    },
    labelDot: {
        backgroundColor: colors.white
    }
})

export default NetworthChart