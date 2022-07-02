import React, { useCallback, useState, useEffect, useRef, createRef } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { View, TextInput, Modal, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { useForm, Controller } from "react-hook-form";
import { capitalizeFirstLetter } from '../../services/stringHelper'
import Button from "./Button";
import Text from '../common/Text';
import { spacing, colors, values, fontSize, formFieldTypes, icons, textInputTypes, fontFamily } from "../../constants";

const { height, width } = Dimensions.get('screen')

const Form = ({
    defaultValues,
    onFormSubmit,
    onFormCancel,
    fields = [],
    primaryButtonText,
    cancelButtonText,
    disabled = false,
    auxillaryComponent,
    formError,
    validationSchema = null,
    additionalComponents = [],
    onFocus = () => {},
}) => {
    const [showFormError, setShowFormError] = useState(true)
    const [showConfirmModal, setShowConfirmModal] = useState({
        show: false,
        text: null,
        primaryButtonText: null,
        secondaryButtonText: null,
        onPress: () => null
    })
    const dropDownFields = fields.map((f) => f.type === formFieldTypes.dropdown ? { name: f.name, list: f.list } : undefined).filter(x => x)
    const secretFields = fields.map((f) => f.secure ? f.name : undefined).filter(x => x)
    const [hideSecret, setHideSecret] = useState({
        ...(
            secretFields.length > 0 ? secretFields.reduce((a, v) => ({ ...a, [v]: true}), {}) : {}
        )
    })
    const [dropdownSelections, setDropDownSelections] = useState({
        ...(
            dropDownFields.length > 0 ? dropDownFields.reduce((a, v) => ({ ...a, [v.name]: { options: v.list, selected: null, ref: useRef(), name: v.name }}), {}) : {}
        )
    })
    const [dropdownTop, setDropdownTop] = useState(0)
    const [visible, setVisible] = useState({ show: false, options: [], name: null })
    const { register, control, handleSubmit, formState: { errors, isDirty, isSubmitting }, clearErrors, setValue } = useForm({
        defaultValues,
        ...(validationSchema ? { resolver: yupResolver(validationSchema)} : {})
    });
    const propInjectedAdditionalComponents = additionalComponents.map((Component, index) => {
        return (
            <Component.component
                {...Component.props}
                key={index}
                disabled={isSubmitting || Component.props.disabled}
                loading={isSubmitting || Component.props.loading}
                handlePress={() => {
                    clearErrors()
                    if (Component.props.confirmOnPress) {
                        setShowConfirmModal({
                            show: true,
                            text: Component.props.confirmText,
                            primaryButtonText: Component.props.primaryConfirmText,
                            secondaryButtonText: Component.props.secondaryConfirmText,
                            onPress: Component.props.handlePress
                        })
                    } else {
                        Component.props.handlePress()
                    }
                }}
            />
        )
    })

    const toggleSecret = useCallback((fieldname) => {
        setHideSecret({
            ...hideSecret,
            [fieldname]: !hideSecret[fieldname]
        })
  })

    const onSubmit = data => {
        setShowFormError(true)
        const formattedData = data
        fields.map((field) => {
            if(field.inputType && field.inputType === textInputTypes.number) {
                formattedData[field.name] = parseFloat(formattedData[field.name]).toFixed(2)
            }
        })
        onFormSubmit(formattedData);
        clearErrors()
    }
  
    const openDropdown = (fieldObj) => {
        fieldObj.ref.current.measure((_fx, _fy, _w, h, _px, py) => {
        setDropdownTop(py + h);
        })
        setVisible({ show: true, options: fieldObj.options, name: fieldObj.name })
    }
  
    const resetDropdown = useCallback(() => {
        setVisible({ show: false, options: [], name: null})
    })

    const toggleDropdown = (fieldObj) => {
        visible.show ? resetDropdown() : openDropdown(fieldObj);
    }

    const selectFromDropdown = useCallback((selection, selectedFieldName) => {
        const updatedDropdownSelections = {
            ...dropdownSelections,
            [selectedFieldName]: {
                ...dropdownSelections[selectedFieldName],
                selected: selection
            }
        }
        setDropDownSelections(updatedDropdownSelections)
        setValue(selectedFieldName, selection)
        clearErrors(selectedFieldName)
        resetDropdown()
    })

    const resetModal = useCallback(() => {
        setShowConfirmModal({
            show: false,
            text: null,
            primaryButtonText: null,
            secondaryButtonText: null,
            onPress: () => null
        })
    })

    const renderInput = (fieldEntry, fieldType, onChange, onBlur, value) => {
    const hideFormErrors = () => {
        if(showFormError) setShowFormError(false)
    }
    const fieldName = fieldEntry.name
    if (fieldType === formFieldTypes.dropdown) {
        const fieldObj = dropdownSelections[fieldName]
        const selectedOption = fieldObj.selected || value
        const placeholder = selectedOption ? null : `Select a ${fieldName}`
        return (
            <View style={styles.dropdownContainer}>
                <TouchableOpacity ref={fieldObj.ref} onPress={() => toggleDropdown(fieldObj)} style={styles.inputContainer}>
                    <View pointerEvents="none">
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={selectedOption ? capitalizeFirstLetter(selectedOption) : ''}
                            selectTextOnFocus={false}
                            underlineColorAndroid="transparent"
                            {...register(fieldName)}
                        >
                            <Text title={selectedOption ? null : placeholder} style={fieldObj.selected ? styles.dropdownValue : styles.placeholder} />
                        </TextInput>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon style={styles.icon} name={icons.down} size={20} color={colors.black} />
                    </View>
                </TouchableOpacity>
                <Modal visible={visible.show} transparent animationType="none" onRequestClose={resetDropdown}>
                    <TouchableOpacity
                        style={styles.overlay}
                        activeOpacity={1}
                        onPress={resetDropdown}
                    >
                        <View style={[styles.dropdownModal, { top: dropdownTop }]}>
                            <FlatList
                                data={visible.options}
                                renderItem={({item, index}) => (
                                    <View style={styles.dropdownItem}>
                                        <TouchableOpacity onPress={() => {
                                            hideFormErrors()
                                            selectFromDropdown(item, visible.name)
                                        }}>
                                            <Text title={capitalizeFirstLetter(item)} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={item => item}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                onBlur={onBlur}
                value={value.toString()}
                onChangeText={onChange}
                onFocus={hideFormErrors}
                autoCapitalize="none"
                secureTextEntry={hideSecret[fieldName]}
                underlineColorAndroid="transparent"
                {...register(fieldName)}

            />
            {fieldEntry.secure && (
                <TouchableOpacity onPress={() => toggleSecret(fieldName)} style={styles.iconContainer}>
                    <Icon style={styles.icon} name={hideSecret[fieldName] ? icons.eyeClosed : icons.eye} size={20} color={colors.black} />
                </TouchableOpacity>
            )}
        </View>
    )
  }

  return (
    <View style={styles.formContainer}>
        <View style={styles.container}>
            {fields.map((fieldEntry) => {
                const fieldName = fieldEntry.name
                const fieldType = fieldEntry.type
                return (
                    <View key={fieldName}>
                        <Text title={fieldEntry.placeholder} />
                        <Controller
                            control={control}
                            render={({ field: { value, onChange, onBlur } }) => renderInput(fieldEntry, fieldType, onChange, onBlur, value)}
                            name={fieldName}
                        />
                        {errors[fieldName] ? <Text style={styles.errorText} title={errors[fieldName].message} /> : <Text style={styles.errorText} title="" />}
                    </View>
                )
            })}
        </View>
        {auxillaryComponent}
        {(formError && showFormError) && <Text title={formError} style={styles.error} />}
        <>
            <Button title={primaryButtonText} handlePress={handleSubmit(onSubmit)} loading={isSubmitting} disabled={isSubmitting} />
            {propInjectedAdditionalComponents}
            {cancelButtonText && (
                <View style={propInjectedAdditionalComponents.length > 0 && styles.cancelContainer}>
                    <Button title={cancelButtonText} handlePress={onFormCancel} variant={values.link}/>
                </View>
            )}
        </>
        <Modal
            visible={showConfirmModal.show}
            transparent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text title={showConfirmModal.text} style={styles.confirmText}/>
                    <Button title={showConfirmModal.primaryButtonText} handlePress={() => {
                        resetModal()
                        showConfirmModal.onPress()
                    }} />
                    <Button title={showConfirmModal.secondaryButtonText} handlePress={() => resetModal()} variant={values.link} />
                </View>
            </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        padding: spacing.xlight
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(43, 43, 43, 0.8)'
    },
    modalContent: {
        justifyContent: 'center',
        backgroundColor: colors.white,
        margin: spacing.medium,
        paddingBottom: spacing.medium
    },
    confirmText: {
        fontFamily: fontFamily.default,
        fontSize: fontSize.medium,
        textAlign: 'center',
        marginVertical: spacing.medium
    },
    formContainer: {
        marginVertical: spacing.xlight,
        marginHorizontal: spacing.xxlight
    },
    cancelContainer: {
        marginTop: spacing.light
    },
    container: {
        marginVertical: spacing.light
    },
    errorText: {
        color: colors.red,
        marginHorizontal: spacing.xlight,
        marginBottom: spacing.xlight,
        marginTop: spacing.xxlight,
        fontSize: fontSize.small
    },
    errorContainers: {
        height: 20,
        margin: spacing.xlight,
        backgroundColor: colors.red,
        paddingVertical: spacing.medium,
        opacity: 0.4,
    },
    error: {
        color: colors.red,
        textAlign: 'center',
        fontSize: fontSize.small,
        backgroundColor: colors.lightred,
        padding: spacing.xlight,
        marginHorizontal: spacing.xlight,
        marginBottom: spacing.xlight
    },
    inputContainer: {
        marginHorizontal: spacing.xlight,
        marginTop: spacing.xlight,
        backgroundColor: colors.xlightgrey,
        paddingHorizontal: spacing.xxlight,
        paddingVertical: spacing.xxlight,
        paddingRight: spacing.xlarge,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        padding: spacing.light,
        justifyContent: 'flex-end'
    },
    iconContainer: {
        position: 'absolute',
        right: 0
    },
    placeholder: {
        color: colors.grey,
        marginLeft: 0,
    },
    dropdownValue: {
        color: colors.black,
        marginLeft: 0,
        alignItems: 'flex-start'
    },
    dropdownContainer: {
        position: 'relative',
    },
    dropdownModal: {
        position: 'absolute',
        backgroundColor: colors.white,
        shadowColor: colors.grey,
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        right: 0,
        left: 0,
        marginHorizontal: spacing.xlight + spacing.xxlight
    },
    dropdownItem: {
        backgroundColor: colors.white,
        marginVertical: spacing.xlight
    }
})

export default Form;