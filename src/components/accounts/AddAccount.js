import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native'
import { useMutationHook, mutations } from '../../services/graphqlQueryBuilder'
import * as Yup from 'yup';
import ScreenHeader from '../common/ScreenHeader'
import Button from '../common/Button';
import Form from '../common/Form'
import { sectionHeaders, values, icons, buttonNames, formFieldTypes, accountTypes, currencyCodes, textInputTypes } from '../../constants'

const AddAccount = ({ onBack, item }) => {
    const [formError, setFormError] = useState(null)
    const [addAccount, { loading: addLoading }] = useMutationHook(mutations.saveAccount(), onBack, (error) => setFormError(error.message))
    const [editAccount, { loading: editLoading }] = useMutationHook(mutations.editAccount(), onBack, (error) => setFormError(error.message))
    const [deleteAccount, { loading: deleteLoading }] = useMutationHook(mutations.deleteAccount(), onBack, (error) => setFormError(error.message))
    const handleSubmit = useCallback(async (data) => {
        if (item) {
            await editAccount({ variables: { accountEditObject: {
                id: item.id,
                name: data.name,
                type: data.type,
                balance: data.balance,
                currency: item.currency,
                userId: item.userId
            } }})
        } else {
            await addAccount({ variables: { accountObject: { ...data, userId: 'b13340b4-d3c6-427c-ad74-1d9046d199d9', currency: 'CAD' } }})
        }
    })

    const handleDelete = useCallback(async () => {
        await deleteAccount({ variables: { accountId: item.id }})
    })

    const leftButtonProps = {
        variant: values.icon,
        iconName: icons.back,
        handlePress: () => onBack()
    }

    const fields = [
        {
            name: 'name',
            placeholder: 'Account Name',
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
            inputType: textInputTypes.number,
        },
        // {
        //     name: 'currency',
        //     type: formFieldTypes.dropdown,
        //     list: [currencyCodes.CAD, currencyCodes.USD],
        //     placeholder: 'Currency'
        // },
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
    });

    const defaultValues = {
        name: item ? item.name : '',
        type: item ? item.type : '',
        balance: item ? item.balance : '',
    }

    const additionalFormButtons = [
        {
            component: Button,
            props: {
                variant: values.secondary,
                title: buttonNames.delete,
                handlePress: () =>handleDelete(),
                loading: editLoading || deleteLoading,
                disabled: editLoading || deleteLoading
            }
        }
    ]

    return (
        <SafeAreaView>
            <ScreenHeader title={sectionHeaders.addAccount} leftButtonProps={leftButtonProps} />
            <Form
                defaultValues={defaultValues}
                onFormSubmit={(data) => handleSubmit(data)}
                onFormCancel={() => onBack()}
                fields={fields}
                primaryButtonText={item ? buttonNames.updateAccount : buttonNames.addAccount}
                cancelButtonText={buttonNames.cancel}
                disabled={addLoading || editLoading || deleteLoading}
                loading={addLoading || editLoading || deleteLoading}
                formError={formError}
                additionalComponents={item ? additionalFormButtons : []}
                validationSchema={validationSchema}
            />
        </SafeAreaView>
    )
}

export default AddAccount