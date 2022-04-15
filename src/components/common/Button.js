import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { spacing, colors, fontSize, fontWeight, values } from '../../constants';


const Button = ({
    title,
    variant = values.primary,
    handlePress = () => {},
    disabled = false,
    loading = false
}) => {
    let buttonStyle = {}
    let loadingSpinnerColor = colors.white
    if (variant === values.primary) {
        buttonStyle = { ...styles.button, ...(variant === values.primary ? { backgroundColor: colors.green } : {}) }
    } else if (variant === values.link) {
        buttonStyle = styles.linkButtonStyle
    } else if (variant === values.secondary) {
        loadingSpinnerColor = colors.green
        buttonStyle = styles.secondaryButton
    }

    return (
        <TouchableOpacity
            style={buttonStyle}
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
                                ...(variant !== values.primary ? { color: colors.green } : { color: colors.white } ),
                                ...(disabled ? styles.disabledText : {})
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
        borderRadius: 30,
        justifyContent: 'center'
    },
    linkButtonStyle: {
        marginVertical: spacing.xlight
    },
    text: {
        textAlign: 'center',
        fontSize: fontSize.medium,
        fontWeight: fontWeight.bold
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