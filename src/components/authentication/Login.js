import React, { useState, useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { colors, spacing, values } from '../../constants';
import { APPICON } from '../../assets'
import Button from '../common/Button';
import Form from '../common/Form';
import { login } from '../../services/auth';


const Login = ({ handleSignUpPress, handleForgotPasswordPress }) => {
    const [submitting, setSubmitting] = useState(false);
    const loginSuccess = useCallback((user) => {
        setSubmitting(false);
    })
    const loginFailed = useCallback((error) => {
        setSubmitting(false);
    })
    const handleLogin = useCallback(async (user) => {
        setSubmitting(true);
        // await login(user, loginSuccess, loginFailed)
    })
    const fields = [
        {
            rules: {
                required: true
            },
            name: 'email',
            placeholder: 'Email'
        },
        {
            rules: {
                required: true
            },
            name: 'password',
            placeholder: 'Password'
        }
    ]

    const defaultValues = {
        email: '',
        password: ''
    }

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