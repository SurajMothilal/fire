import React, { useCallback, useState, useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { useForm, Controller } from "react-hook-form";
import Button from "./Button";
import Text from '../common/Text';
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
    disabled = false,
    auxillaryComponent,
    formError,
    validationSchema = null,
    additionalComponents = [],
    onFocus = () => {}
}) => {
  const secretFields = fields.map((f) => f.secure ? f.name : undefined).filter(x => x)
  const [hideSecret, setHideSecret] = useState({
    ...(
        secretFields.length > 0 ? secretFields.reduce((a, v) => ({ ...a, [v]: true}), {}) : {}
    )
  })
  const { register, control, handleSubmit, formState: { errors, isDirty, isSubmitting, isSubmitSuccessful }, clearErrors } = useForm({
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

  useEffect(() => {

  }, [isSubmitSuccessful])
  console.log(isDirty)
  return (
    <View style={styles.formContainer}>
        <View style={styles.container}>
            {fields.map((fieldEntry) => {
                const fieldName = fieldEntry.name
                return (
                    <View key={fieldName}>
                        <Text title={fieldEntry.placeholder} />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
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
                                            <Icon style={styles.icon} name={hideSecret[fieldName] ? 'eye-slash' : 'eye'} size={20} color={colors.black} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
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
        alignItems: 'center'
    },
    icon: {
        padding: spacing.light,
        justifyContent: 'flex-end'
    },
    iconContainer: {
        position: 'absolute',
        right: 0
    }
})

export default Form;