import React, { useState, useCallback } from 'react';
import * as Yup from 'yup';
import { View, StyleSheet, Dimensions } from 'react-native';
import Text from '../common/Text';
import ScreenTitle from '../common/ScreenTitle';
import { colors, spacing, fontSize } from '../../constants';
import Form from '../common/Form';
import { passwordResetSubmit } from '../../services/auth';
import { errors } from '../../constants';
import { errorCodes } from '../../services/errorHandler';

const windowHeight = Dimensions.get('window').height

const ForgotPasswordSubmit = ({
    handleSuccess,
    handleCancel,
    locale,
    email
}) => {
    const [formError, setFormError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const handleSendSuccess = useCallback(() => {
        setSubmitting(false)
        handleSuccess()
    })
    const handleError = useCallback((error) => {
        setSubmitting(false)
        setFormError(errorCodes?.[error.code]?.[locale] || errors.generic)
    })
    const handleSubmit = useCallback(async (data) => {
        setSubmitting(true)
        await passwordResetSubmit(email, data.code, data.password, () => handleSendSuccess(), handleError)
    })
    const fields = [
        {
            name: 'code',
            placeholder: 'Confirmation Code'
        },
        {
            name: 'password',
            placeholder: 'New Password',
            secure: true
        },
        {
            name: 'confirmPassword',
            placeholder: 'Confirm New Password',
            secure: true
        }
    ]

    const defaultValues = {
        code: '',
        password: '',
        confirmPassword: ''
    }

    const validationSchema = Yup.object().shape({
        code: Yup.string()
            .required('Code is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
    })

    return (
        <View style={styles.container}> 
            <ScreenTitle title="Forgot Password" />
            <Text style={styles.subText} title="Enter the code sent to your email along with your new password." />
            <Form
                defaultValues={defaultValues}
                onFormSubmit={(data) => handleSubmit(data)}
                onFormCancel={() => handleCancel(email)}
                fields={fields}
                primaryButtonText="Reset Password"
                cancelButtonText="Back"
                loading={submitting}
                disabled={submitting}
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

export default ForgotPasswordSubmit