import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { spacing, colors, fontSize, fontWeight, fontFamily, values } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons'

const Button = ({
    title,
    variant = values.primary,
    handlePress = () => {},
    disabled = false,
    loading = false,
    containerStyle,
    textStyle = {},
    iconName,
    iconColor
}) => {
    let buttonStyle = {}
    let loadingSpinnerColor = colors.white
    if (variant === values.primary) {
        buttonStyle = { ...styles.button, ...(variant === values.primary ? { backgroundColor: colors.black } : {}) }
    } else if (variant === values.primaryGrey) {
        buttonStyle = { ...styles.primaryGrey }
    } else if (variant === values.link) {
        buttonStyle = styles.linkButtonStyle
    } else if (variant === values.secondary) {
        loadingSpinnerColor = colors.black
        buttonStyle = styles.secondaryButton
    } else if (variant === values.icon) {
        buttonStyle = styles.iconButton
    }

    const renderedElement = variant === values.icon
        ?  <Icon name={iconName} size={25} color={iconColor || colors.black} />
        : 
            <Text 
                style={
                    {
                        ...styles.text, 
                        ...(variant !== values.primary ? { color: colors.black } : { color: colors.white } ),
                        ...(disabled ? styles.disabledText : {}),
                        ...textStyle
                    }
                }
            >
                {title}
            </Text>
        

    return (
        <TouchableOpacity
            style={containerStyle ? containerStyle : buttonStyle}
            title={title}
            onPress={handlePress}
            disabled={disabled}
        >
            {
                loading
                    ? <ActivityIndicator color={loadingSpinnerColor} size="large" />
                    : renderedElement
            }
          
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: spacing.xlight,
        marginHorizontal: spacing.xlight,
        height: 50,
        justifyContent: 'center'
    },
    primaryGrey: {
        backgroundColor: colors.xlightgrey,
        paddingVertical: spacing.xlight,
        borderRadius: 10,
        paddingHorizontal: spacing.light,
        marginHorizontal: spacing.xlight,
        marginTop: spacing.xlight
    },
    linkButtonStyle: {
        marginVertical: spacing.xlight
    },
    text: {
        textAlign: 'center',
        fontSize: fontSize.medium,
        fontWeight: fontWeight.bold,
        fontFamily: fontFamily.default
    },
    disabledText: {
        opacity: 0.5
    },
    secondaryButton: {
        borderColor: colors.black,
        borderWidth: 1,
        height: 50,
        marginHorizontal: spacing.xlight,
        justifyContent: 'center'
    }
})

export default Button