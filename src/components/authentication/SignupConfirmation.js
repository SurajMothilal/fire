import React, { useCallback, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import ScreenTitle from '../common/ScreenTitle';
import Form from '../common/Form';
import { confirmSignup, resendConfirmation } from '../../services/auth';
import Button from '../common/Button';
import { colors, fontSize, spacing, values, errors } from '../../constants';

const SignupConfirmation = ({ handleSuccess, email }) => {
    const [codeResent, setCodeResent] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [codeResending, setCodeResending] = useState(false)
    const [formDisable, setFormDisable] = useState(false)
    const [formError, setFormError] = useState(null)

    const unblockForm = () => {
        setFormDisable(false)
        setSubmitting(false)
        handleSuccess()
    }

    const handleResend = useCallback(async () => {
        setFormDisable(true)
        setCodeResending(true)
        await resendConfirmation(email, () => setCodeResent(true), () => setFormError(errors.generic))
        setCodeResending(false)
        setFormDisable(false)
    })
    const handleSubmit = useCallback( async (data) => {
        setFormDisable(true)
        setSubmitting(true)
        await confirmSignup(email, data.confirmation, () => unblockForm(), () => setFormError(errors.generic))
    })
    const fields = [
        {
            rules: {
                required: true
            },
            name: 'confirmation',
            placeholder: 'Confirmation Code',
            errorMessage: ' invalid'
        },
    ]
    const defaultValues = {
        confirmation: ''
    }
    const auxillaryComponent = codeResent ? <Text style={styles.confirmationResent}>Confirmation resent</Text> : null
    return <>
        <ScreenTitle title="Confirm Account" />
        <Form
             defaultValues={defaultValues}
             onFormSubmit={(data) => handleSubmit(data)}
             onFormCancel={() => handleCancel()}
             fields={fields}
             primaryButtonText="Submit"
             disabled={formDisable}
             loading={submitting}
             auxillaryComponent={auxillaryComponent}
             onFocus={() => setCodeResent(false)}
             formError={formError}
        />
        <Button
            variant={values.secondary}
            title="Resend Confirmation"
            handlePress={() => handleResend()}
            disabled={formDisable}
            loading={true}
        />
    </>
}

const styles = StyleSheet.create({
    confirmationResent: {
        color: colors.purple,
        textAlign: 'center',
        fontSize: fontSize.small,
        marginBottom: spacing.xlight
    }
})

export default SignupConfirmation