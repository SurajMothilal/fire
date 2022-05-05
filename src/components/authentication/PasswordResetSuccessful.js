import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Text from '../common/Text';
import ScreenTitle from '../common/ScreenTitle';
import { colors, spacing, fontSize } from '../../constants';
import Button from '../common/Button';
import { values } from '../../constants';

const windowHeight = Dimensions.get('window').height

const PasswordResetSuccessful = ({
    handleClick
}) => {
    return (
        <View style={styles.container}> 
            <ScreenTitle title="Reset Successful" />
            <Text style={styles.subText} title="Your password reset is successful. You can proceed to login now." />
            <Button
                variant={values.primary}
                title="Go to Login"
                handlePress={() => handleClick()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    subText: {
        margin: spacing.medium,
        color: colors.black,
        fontSize: fontSize.medium
    },
    container: {
        flex: 1,
        marginTop: windowHeight * 0.075
    }
})

export default PasswordResetSuccessful