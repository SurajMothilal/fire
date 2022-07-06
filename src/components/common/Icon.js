import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../constants'

const AppIcon = ({ iconName, iconColor = colors.black, size = 25 }) => {
    return (
        <Icon name={iconName} size={size} color={iconColor} />
    )
}

export default AppIcon