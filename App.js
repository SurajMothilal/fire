import React from 'react';
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import NvLogin from './src/navigation/NvLogin'
import NvSignup from './src/navigation/NvSignup'
import NvHome from './src/navigation/NvHome'
import NvSignupConfirmation from './src/navigation/NvSignupConfirmation';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors, screenNames } from './src/constants'

Amplify.configure(awsconfig)

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white
  },
};

const App = () => {

  return (
      <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            initialRouteName={screenNames.login}
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name={screenNames.login} component={NvLogin} />
            <Stack.Screen name={screenNames.signup} component={NvSignup} />
            <Stack.Screen name={screenNames.signupconfirmation} component={NvSignupConfirmation} />
            <Stack.Screen name={screenNames.home} component={NvHome} />
          </Stack.Navigator>
      </NavigationContainer>
  );
};



export default App;
