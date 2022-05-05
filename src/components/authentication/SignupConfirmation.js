import React, { useCallback, useState } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import * as Yup from 'yup';
import Text from '../common/Text'
import ScreenTitle from '../common/ScreenTitle'
import Form from '../common/Form'
import { confirmSignup, resendConfirmation } from '../../services/auth'
import Button from '../common/Button'
import { loggedInUserId } from '../../graphql/cache'
import { colors, fontSize, spacing, values, errors } from '../../constants'
import { errorCodes } from '../../services/errorHandler'

const windowHeight = Dimensions.get('window').height

const SignupConfirmation = ({ handleSuccess, email, locale }) => {
    const [codeResent, setCodeResent] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [codeResending, setCodeResending] = useState(false)
    const [formDisable, setFormDisable] = useState(false)
    const [formError, setFormError] = useState(null)

    const unblockForm = (user) => {
        setFormDisable(false)
        setSubmitting(false)
        setCodeResending(false)
        loggedInUserId(user?.username)
        handleSuccess()
    }

    const handleResendError = useCallback((error) => {
        setFormError(errorCodes?.[error.code]?.[locale] || errors.generic)
    })

    const handleResend = useCallback(async () => {
        setFormDisable(true)
        setCodeResending(true)
        await resendConfirmation(email, () => setCodeResent(true), handleResendError)
        setCodeResending(false)
        setFormDisable(false)
    })
    const handleSubmit = useCallback( async (data) => {
        setFormDisable(true)
        setSubmitting(true)
        await confirmSignup(email, data.confirmation, (user) => unblockForm(user), () => setFormError(errors.generic))
    })
    const fields = [
        {
            name: 'confirmation',
            placeholder: 'Confirmation Code',
        },
    ]

    const validationSchema = Yup.object().shape({
        confirmation: Yup.string()
            .required('Confirmation code is required')  
    });

    const defaultValues = {
        confirmation: ''
    }

    const auxillaryComponent = codeResent ? <Text style={styles.confirmationResent} title="Confirmation resent" /> : null
    return (
        <View style={styles.container}> 
            <ScreenTitle title="Confirm Account" />
            <Text style={styles.subText} title="Enter the confirmation code sent to your email" />
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
                 validationSchema={validationSchema}
            />
            <Button
                variant={values.secondary}
                title="Resend Confirmation"
                handlePress={() => handleResend()}
                disabled={formDisable}
                loading={codeResending}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    confirmationResent: {
        color: colors.purple,
        textAlign: 'center',
        fontSize: fontSize.small,
        marginBottom: spacing.xlight
    },
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

export default SignupConfirmation