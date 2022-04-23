import React, { useState, useCallback } from 'react'
import * as Yup from 'yup'
import { View, Image, StyleSheet } from 'react-native'
import { colors, spacing, values } from '../../constants'
import { APPICON } from '../../assets'
import { resendConfirmation } from '../../services/auth'
import Button from '../common/Button'
import Form from '../common/Form'
import { login } from '../../services/auth'
import { errors } from '../../constants'
import { errorCodes } from '../../services/errorHandler'
import { loggedInUserId } from '../../graphql/cache'


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
            />
            <Button
                variant={values.link}
                title="Sign up"
                handlePress={() => handleSignUpPress()}
                disabled={submitting}
            />
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
        justifyContent: 'center'
    }
})

export default Login