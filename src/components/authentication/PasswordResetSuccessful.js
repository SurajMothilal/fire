import React from 'react';
import { Text, StyleSheet } from 'react-native';
import ScreenTitle from '../common/ScreenTitle';
import { colors, spacing, fontSize } from '../../constants';
import Button from '../common/Button';
import { values } from '../../constants';

const PasswordResetSuccessful = ({
    handleClick
}) => {
    return (
        <>
            <ScreenTitle title="Reset Successful" />
            <Text style={styles.subText}>Your password reset is successful. You can login now.</Text>
            <Button
                variant={values.primary}
                title="Go to Login"
                handlePress={() => handleClick()}
            />
        </>
    )
}

const styles = StyleSheet.create({
    subText: {
        margin: spacing.medium,
        color: colors.black,
        fontSize: fontSize.medium,
        textAlign: 'center'
    }
})

export default PasswordResetSuccessful