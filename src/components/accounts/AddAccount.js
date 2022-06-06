import React, { useState, useCallback } from 'react'
import { SafeAreaView, View } from 'react-native'
import * as Yup from 'yup';
import ScreenHeader from '../common/ScreenHeader'
import Form from '../common/Form'
import { sectionHeaders, values, icons, buttonNames, formFieldTypes, accountTypes } from '../../constants'

const AddAccount = ({ onBack }) => {
    const [formError, setFormError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = useCallback(async (data) => {
        setSubmitting(true)
    })

    const leftButtonProps = {
        variant: values.icon,
        iconName: icons.back,
        handlePress: () => onBack()
    }

    const fields = [
        {
            name: 'name',
            placeholder: 'Account Name'
        },
        {
            name: 'type',
            type: formFieldTypes.dropdown,
            list: [accountTypes.cash, accountTypes.debt, accountTypes.investment],
            placeholder: 'Type'
        },
        {
            name: 'balance',
            placeholder: 'Current Balance',
        },
        {
            name: 'currency',
            placeholder: 'Currency',
        }
    ]

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Account Name is required'),
        type: Yup.string()
            .required('Type is required'),
        balance: Yup.string()
            .required('Current Balance is required'),
        currency: Yup.string()
            .required('Currency is required')            
    });

    const defaultValues = {
        name: '',
        type: '',
        balance: '',
        currency: ''
    }

    return (
        <SafeAreaView>
            <ScreenHeader title={sectionHeaders.addAccount} leftButtonProps={leftButtonProps} />
            <Form
                defaultValues={defaultValues}
                onFormSubmit={(data) => console.log(data)}
                onFormCancel={() => null()}
                fields={fields}
                primaryButtonText={buttonNames.addAccount}
                cancelButtonText={buttonNames.cancel}
                disabled={submitting}
                loading={submitting}
                formError={formError}
                validationSchema={validationSchema}
            />
        </SafeAreaView>
    )
}

export default AddAccount