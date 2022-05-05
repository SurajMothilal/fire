import React, { useState, useCallback } from 'react';
import * as Yup from 'yup';
import { View, StyleSheet, Dimensions } from 'react-native';
import Text from '../common/Text';
import ScreenTitle from '../common/ScreenTitle';
import { colors, spacing, fontSize } from '../../constants';
import Form from '../common/Form';
import { sendPasswordReset } from '../../services/auth';
import { errors } from '../../constants';
import { errorCodes } from '../../services/errorHandler';


const windowHeight = Dimensions.get('window').height

const ForgotPassword = ({
    handleSuccess,
    handleCancel,
    locale
}) => {
    const [formError, setFormError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const handleSendSuccess = useCallback((email) => {
        setSubmitting(false)
        handleSuccess(email)
    })
    const handleError = useCallback((error) => {
        setSubmitting(false)
        setFormError(errorCodes?.[error.code]?.[locale] || errors.generic)
    })
    const handleSubmit = useCallback(async (data) => {
        setSubmitting(true)
        await sendPasswordReset(data.email, () => handleSendSuccess(data.email), handleError)
    })
    const fields = [
        {
            name: 'email',
            placeholder: 'Email'
        }
    ]

    const defaultValues = {
        email: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email must be valid')
            .required('Email is required')
    })

    return (
        <View style={styles.container}> 
            <ScreenTitle title="Forgot Password" />
            <Text style={styles.subText} title="Enter the email address associated with your account." />
            <Form
                defaultValues={defaultValues}
                onFormSubmit={(data) => handleSubmit(data)}
                onFormCancel={() => handleCancel()}
                fields={fields}
                primaryButtonText="Send Confirmation"
                cancelButtonText="Cancel"
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

export default ForgotPassword