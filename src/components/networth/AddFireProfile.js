import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native'
import { useMutationHook } from '../../services/graphqlQueryBuilder'
import { createFireProfile } from '../../graphql/mutations'
import Text from '../common/Text'
import ScreenHeader from '../common/ScreenHeader'
import * as Yup from 'yup';
import Button from '../common/Button';
import Form from '../common/Form'
import { sectionHeaders, values, icons, buttonNames, formFieldTypes, accountTypes, currencyCodes, textInputTypes, fireTypes } from '../../constants'


const AddFireProfile = ({ onBack }) => {
    const [formError, setFormError] = useState(null)
    const [addFireProfile, { loading: addLoading }] = useMutationHook(createFireProfile, onBack, (error) => setFormError(error.message))
    const handleSubmit = useCallback(async (data) => {
        const payload = {
            targetYear: data.targetYear,
            fireType: data.fireType,
            fireProfileUserId: 'ac0c8c44-c8d9-4b5c-b427-3946f5eb8054',
            ...(isNaN(data.targetYearlyExpense) ? {} : { targetYearlyExpense: data.targetYearlyExpense }),
            ...(isNaN(data.targetPortfolioValue) ? {} : { targetPortfolioValue: data.targetPortfolioValue })
        }
        await addFireProfile({ variables: { input: payload }})
    })

    const leftButtonProps = {
        variant: values.icon,
        iconName: icons.back,
        handlePress: () => onBack()
    }
    
    const today = new Date

    const fields = [
        {
            name: 'targetYear',
            placeholder: 'Target Retirement Year',
            helpText: 'Enter the year by which you would like to retire.'
        },
        {
            name: 'fireType',
            type: formFieldTypes.dropdown,
            list: [fireTypes.traditional, fireTypes.custom],
            placeholder: 'Type of FIRE',
            helpText: 'Choose to either follow one of the traditional FIRE paths or select CUSTOM to enter your own target number.'
        },
        {
            name: 'targetYearlyExpense',
            placeholder: 'Yearly Expenses in Retirement',
            inputType: textInputTypes.number,
            dependsOn: {
                field: 'fireType',
                condition: 'not',
                value: fireTypes.custom
            },
            helpText: 'Enter the total yearly expenses you would like to have in retirement. This will include housing, food, utilities, entertainment, fun-money, donations etc..'
        },
        {
            name: 'targetPortfolioValue',
            placeholder: 'Target Investment Portfolio Value',
            inputType: textInputTypes.number,
            dependsOn: {
                field: 'fireType',
                condition: 'is',
                value: fireTypes.custom
            },
            helpText: 'Enter your target portfolio value in retirement.'
        }
    ]

    const validationSchema = Yup.object().shape({
        targetYear: Yup.number()
            .transform(value => (isNaN(value) ? undefined : value))
            .required('Target retirement year is required')
            .min(today.getFullYear() + 1, 'Must be a valid year in the future.')
            .max(today.getFullYear() + 100, `Enter a value less than ${today.getFullYear() + 100}`),
        fireType: Yup.string()
            .required('Type of FIRE is required.'),
        targetYearlyExpense: Yup.string()
            .when('fireType', (dependentValue, schema) => {
                if (!dependentValue || dependentValue === fireTypes.custom) {
                    return schema
                } else {
                    return Yup
                        .number()
                        .transform(value => (isNaN(value) ? undefined : value))
                        .required('Yearly expenses in retirement is required.')
                        .min(0, 'Must be greater than 0')
                        .max(100000000, 'Amount too large. Enter a smaller amount')
                }
            }),
        targetPortfolioValue: Yup.string()
            .when('fireType', (dependentValue, schema) => {
                if (!dependentValue || dependentValue !== fireTypes.custom) {
                    return schema
                } else {
                    return Yup
                        .number()
                        .transform(value => (isNaN(value) ? undefined : value))
                        .required('Target networth is required.')
                        .min(0, 'Must be greater than 0')
                        .max(1000000000, 'Amount too large. Enter a smaller amount')
                }
            }),
    });

    const defaultValues = {
        targetYear: '',
        fireType: '',
        targetYearlyExpense: '',
        targetPortfolioValue: ''
    }

    return (
        <SafeAreaView>
            <ScreenHeader title={sectionHeaders.fireProfile} leftButtonProps={leftButtonProps} />
            <Form
                defaultValues={defaultValues}
                onFormSubmit={(data) => handleSubmit(data)}
                onFormCancel={() => onBack()}
                fields={fields}
                primaryButtonText={buttonNames.submit}
                cancelButtonText={buttonNames.cancel}
                disabled={addLoading}
                loading={addLoading}
                formError={formError}
                validationSchema={validationSchema}
            />
        </SafeAreaView>
    )
}

export default AddFireProfile