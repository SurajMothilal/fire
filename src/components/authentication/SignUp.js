import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native'
import * as Yup from 'yup';
import ScreenTitle from '../common/ScreenTitle';
import Form from '../common/Form';
import { signUp } from '../../services/auth';
import { errorCodes } from '../../services/errorHandler';
import Text from '../common/Text';
import { errors, colors, spacing, fontSize } from '../../constants';

const windowHeight = Dimensions.get('window').height

const SignUp = ({ handleCancel, handleSuccess, locale }) => {
    const [formError, setFormError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = useCallback(async (data) => {
        setSubmitting(true)
        await signUp(data, signUpSuccess, signUpFailed)
    })
    const signUpSuccess = useCallback((user) => {
        setSubmitting(false)
        handleSuccess(user.username)
    })
    const signUpFailed = useCallback((error) => {
        setSubmitting(false)
        setFormError(errorCodes?.[error.code]?.[locale] || errors.generic)
    })
    const fields = [
        {
            name: 'name',
            placeholder: 'Name'
        },
        {
            name: 'email',
            placeholder: 'Email'
        },
        {
            name: 'password',
            placeholder: 'Password',
            secure: true
        },
        {
            name: 'confirmpassword',
            placeholder: 'Confirm Password',
            secure: true
        }
    ]

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .email('Email must be valid')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmpassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
            
    });

    const defaultValues = {
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    }

    return (
        <View style={styles.container}> 
            <ScreenTitle title="Sign Up" />
            <Text style={styles.subText} title="Sign up for a new account." />
            <Form
                defaultValues={defaultValues}
                onFormSubmit={(data) => handleSubmit(data)}
                onFormCancel={() => handleCancel()}
                fields={fields}
                primaryButtonText="Sign Up"
                cancelButtonText="Cancel"
                disabled={submitting}
                loading={submitting}
                formError={formError}
                validationSchema={validationSchema}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    subText: {
        marginHorizontal: spacing.medium,
        marginTop: spacing.medium,
        color: colors.black,
        fontSize: fontSize.medium,
    },
    container: {
        flex: 1,
        marginTop: windowHeight * 0.075
    }
})

export default SignUp