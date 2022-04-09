import React, { useCallback, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { useForm, Controller } from "react-hook-form";
import Button from "./Button";
import { spacing, colors, values, fontSize } from "../../constants";


/*
    field = {
        onChange: func,
        onBlur: func,
        value: string,
        placeholder: string,
        name: string
    }
*/

const Form = ({
    defaultValues,
    onFormSubmit,
    onFormCancel,
    fields = [],
    primaryButtonText,
    cancelButtonText,
    loading = false,
    disabled = false,
    auxillaryComponent,
    formError,
    validationSchema = null,
    onFocus = () => {}
}) => {
  const secretFields = fields.map((f) => f.secure ? f.name : undefined).filter(x => x)
  const [hideSecret, setHideSecret] = useState({
    ...(
        secretFields.length > 0 ? secretFields.reduce((a, v) => ({ ...a, [v]: true}), {}) : {}
    )
  })
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    ...(validationSchema ? { resolver: yupResolver(validationSchema)} : {})
  });
  const toggleSecret = useCallback((fieldname) => {
    setHideSecret({
        ...hideSecret,
        [fieldname]: !hideSecret[fieldname]
    })
  })
  const onSubmit = data => onFormSubmit(data);

  return (
    <View style={styles.formContainer}>
        <View style={styles.container}>
            {fields.map((fieldEntry) => {
                const fieldName = fieldEntry.name
                return (
                    <View key={fieldName}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={fieldEntry.placeholder}
                                        placeholderTextColor={colors.grey}
                                        onFocus={onFocus}
                                        secureTextEntry={hideSecret[fieldName]}
                                        underlineColorAndroid="transparent"
                                        {...register(fieldName)}
                                    />
                                    {fieldEntry.secure && (
                                        <TouchableOpacity onPress={() => toggleSecret(fieldName)} style={styles.iconContainer}>
                                            <Icon style={styles.icon} name={hideSecret[fieldName] ? 'eye-slash' : 'eye'} size={20} color={colors.green} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                            name={fieldName}
                        />
                        {errors[fieldName] ? <Text style={styles.text}>{errors[fieldName].message}</Text> : <Text style={styles.text}></Text>}
                    </View>
                )
            })}
        </View>
        {auxillaryComponent}
        {formError && <Text style={styles.error}>{formError}</Text>}
        <>
            <Button title={primaryButtonText} handlePress={handleSubmit(onSubmit)} loading={loading} disabled={disabled} />
            {cancelButtonText && <Button title={cancelButtonText} handlePress={onFormCancel} variant={values.link}/>}
        </>
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
        marginHorizontal: spacing.xlight,
        marginTop: spacing.xlight,
        backgroundColor: colors.xlightgrey,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: colors.grey,
        padding: spacing.xlight
    },
    formContainer: {
        marginVertical: spacing.xlight,
        marginHorizontal: spacing.xxlight
    },
    container: {
        marginVertical: spacing.light
    },
    text: {
        color: colors.red,
        marginHorizontal: spacing.xlight,
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
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: colors.grey,
        paddingHorizontal: spacing.xxlight,
        paddingVertical: spacing.xxlight,
        paddingRight: spacing.xlarge,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        padding: spacing.light,
        justifyContent: 'flex-end'
    },
    iconContainer: {
        position: 'absolute',
        right: 0
    },
    input: {
        paddingVertical: spacing.xlight,
        paddingRight: spacing.medium,
        backgroundColor: colors.white
    },
})

export default Form;