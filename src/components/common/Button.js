import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { spacing, colors, fontSize, fontWeight, fontFamily, values } from '../../constants';


const Button = ({
    title,
    variant = values.primary,
    handlePress = () => {},
    disabled = false,
    loading = false,
    containerStyle,
    textStyle = {}
}) => {
    let buttonStyle = {}
    let loadingSpinnerColor = colors.white
    if (variant === values.primary) {
        buttonStyle = { ...styles.button, ...(variant === values.primary ? { backgroundColor: colors.black } : {}) }
    } else if (variant === values.link) {
        buttonStyle = styles.linkButtonStyle
    } else if (variant === values.secondary) {
        loadingSpinnerColor = colors.green
        buttonStyle = styles.secondaryButton
    }

    return (
        <TouchableOpacity
            style={containerStyle ? containerStyle : buttonStyle}
            title={title}
            onPress={handlePress}
            disabled={disabled}
        >
            {
                loading
                ?
                    <ActivityIndicator color={loadingSpinnerColor} size="large" />
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
        borderColor: colors.green,
        borderRadius: 30,
        borderWidth: 1.5,
        height: 50,
        marginHorizontal: spacing.xlight,
        justifyContent: 'center'
    }
})

export default Button