import React, { useState, useCallback } from 'react'
import * as Yup from 'yup'
import { View, Image, StyleSheet } from 'react-native'
import { colors, fontSize, fontWeight, spacing, values } from '../../constants'
import { APPICON } from '../../assets'
import { resendConfirmation } from '../../services/auth'
import Button from '../common/Button'
import Form from '../common/Form'
import { login } from '../../services/auth'
import { errors } from '../../constants'
import { errorCodes } from '../../services/errorHandler'
import { loggedInUserId } from '../../graphql/cache'
import Text from '../common/Text'


const Login = ({
    handleSignUpPress,
    handleForgotPasswordPress,
    handleUnconfirmedLogin,
    handleLoginSuccess,
    locale
}) => {
    const [formError, setFormError] = useState(null)
    const [submitting, setSubmitting] = useState(false);
    const loginSuccess = useCallback(async (user) => {
        if(user?.attributes?.email_verified) {
            loggedInUserId(user?.username)
            handleLoginSuccess()
        } else {
            await resendConfirmation(user?.attributes?.email)
            handleUnconfirmedLogin(user?.attributes?.email)
        }
        setSubmitting(false);
    })
    const loginFailed = useCallback((error) => {
        setSubmitting(false);
        setFormError(errorCodes?.[error.code]?.[locale] || errors.generic)
    })
    const handleLogin = useCallback(async (user) => {
        setSubmitting(true);
        await login(user, loginSuccess, loginFailed)
    })
    const fields = [
        {
            name: 'email',
            placeholder: 'Email'
        },
        {
            name: 'password',
            placeholder: 'Password',
            secure: true
        }
    ]

    const defaultValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email must be valid')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
    })

    return (
        <View style={styles.screenContainer}>
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={APPICON}
                    />
                </View>
                <Form
                    defaultValues={defaultValues}
                    onFormSubmit={(data) => handleLogin(data)}
                    fields={fields}
                    primaryButtonText="Login"
                    loading={submitting}
                    disabled={submitting}
                    formError={formError}
                    validationSchema={validationSchema}
                />
                <Button
                    variant={values.link}
                    title="Forgot your password?"
                    handlePress={() => handleForgotPasswordPress()}
                    disabled={submitting}
                    containerStyle={styles.forgotPasswordContainer}
                    textStyle={styles.forgotButtonText}
                />
            </View>
            <View style={styles.footerContainer}>
                <Text title="Don't have an account?"/>
                <Button
                    variant={values.link}
                    title="Sign up"
                    handlePress={() => handleSignUpPress()}
                    disabled={submitting}
                    containerStyle={styles.signUpContainer}
                    textStyle={styles.signUpText}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        marginTop: spacing.large,
        alignSelf: 'center',
        borderColor: colors.white
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderColor: colors.black,
        borderRightWidth: 30,
        alignSelf: 'center'
    },
    mainContainer: {
        paddingTop: '15%',
        justifyContent: 'center',
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginRight: spacing.medium
    },
    signUpContainer: {
        marginBottom: spacing.xlarge,
        paddingBottom: spacing.large,
        marginLeft: spacing.xlight
    },
    screenContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    forgotButtonText: {
        fontSize: fontSize.small
    },
    signUpText: {
        fontSize: fontSize.medium,
        fontWeight: fontWeight.bold
    }
})

export default Login