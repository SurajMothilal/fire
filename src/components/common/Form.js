import React, { useCallback, useState, useEffect, useRef, createRef } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { useForm, Controller } from "react-hook-form";
import { capitalizeFirstLetter } from '../../services/stringHelper'
import Button from "./Button";
import Text from '../common/Text';
import { spacing, colors, values, fontSize, formFieldTypes, icons } from "../../constants";

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
    onFocus = () => {}
}) => {
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
    const { register, control, handleSubmit, formState: { errors, isDirty, isSubmitting, isSubmitSuccessful }, clearErrors, setValue } = useForm({
        defaultValues,
        ...(validationSchema ? { resolver: yupResolver(validationSchema)} : {})
    });
    const propInjectedAdditionalComponents = additionalComponents.map((Component) => {
        return (
            <Component.component
                {...Component.props}
                disabled={isSubmitting || Component.props.disabled}
                loading={isSubmitting || Component.props.loading}
                handlePress={() => {
                    clearErrors()
                    Component.props.handlePress
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
        onFormSubmit(data);
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

    const renderInput = (fieldEntry, fieldType, onChange, onBlur, value, onFocus) => {
    const fieldName = fieldEntry.name
    if (fieldType === formFieldTypes.dropdown) {
        const fieldObj = dropdownSelections[fieldName]
        const placeholder = fieldObj.selected ? null : `Select a ${fieldName}`
        return (
            <View style={styles.dropdownContainer}>
                <TouchableOpacity ref={fieldObj.ref} onPress={() => toggleDropdown(fieldObj)} style={styles.inputContainer}>
                    <View pointerEvents="none">
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={fieldObj.selected ? capitalizeFirstLetter(fieldObj.selected) : ''}
                            selectTextOnFocus={false}
                            underlineColorAndroid="transparent"
                            {...register(fieldName)}
                        >
                            <Text title={fieldObj.selected ? null : placeholder} style={fieldObj.selected ? styles.dropdownValue : styles.placeholder} />
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
                                        <TouchableOpacity onPress={() => selectFromDropdown(item, visible.name)}>
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
                onChangeText={onChange}
                value={value}
                onFocus={onFocus}
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
                const fieldValue = fieldEntry.value
                return (
                    <View key={fieldName}>
                        <Text title={fieldEntry.placeholder} />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => renderInput(fieldEntry, fieldType, onChange, onBlur, fieldValue)}
                            name={fieldName}
                        />
                        {errors[fieldName] ? <Text style={styles.errorText} title={errors[fieldName].message} /> : <Text style={styles.errorText} title="" />}
                    </View>
                )
            })}
        </View>
        {auxillaryComponent}
        {formError && <Text title={formError} style={styles.error} />}
        <>
            <Button title={primaryButtonText} handlePress={handleSubmit(onSubmit)} loading={isSubmitting} disabled={isSubmitting} />
            {propInjectedAdditionalComponents}
            {cancelButtonText && <Button title={cancelButtonText} handlePress={onFormCancel} variant={values.link}/>}
        </>
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        padding: spacing.xlight
    },
    formContainer: {
        marginVertical: spacing.xlight,
        marginHorizontal: spacing.xxlight
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