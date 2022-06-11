import React, { useState, useCallback } from 'react'
import { SafeAreaView, View } from 'react-native'
import { useMutationHook, mutations } from '../../services/graphqlQueryBuilder'
import * as Yup from 'yup';
import ScreenHeader from '../common/ScreenHeader'
import Form from '../common/Form'
import { sectionHeaders, values, icons, buttonNames, formFieldTypes, accountTypes, currencyCodes } from '../../constants'

const AddAccount = ({ onBack }) => {
    const [formError, setFormError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [addAccount, { data, loading, error }] = useMutationHook(mutations.saveAccount())
    const handleSubmit = useCallback(async (data) => {
        setSubmitting(true)
    })

    console.log(loading)
    console.log(error)
    console.log(data)

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
            type: formFieldTypes.dropdown,
            list: [currencyCodes.CAD, currencyCodes.USD],
            placeholder: 'Currency'
        },
    ]

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Account Name is required')
            .min(3, 'Name must be atleast 3 characters')
            .max(30, 'Name must be less than 30 characters'),
        type: Yup.string()
            .required('Type is required'),
        balance: Yup.string()
            .required('Current Balance is required')
            .matches(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/, 'Enter a valid balance'),
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
                onFormSubmit={(data) => addAccount({ variables: { accountObject: { ...data, userId: 'b13340b4-d3c6-427c-ad74-1d9046d199d9' } }})}
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