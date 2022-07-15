// require('dotenv').config()
import React from 'react'
import { View } from 'react-native'
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import NvLogin from './src/navigation/NvLogin'
import NvSignup from './src/navigation/NvSignup'
import NvHome from './src/navigation/NvHome'
import NvSignupConfirmation from './src/navigation/NvSignupConfirmation'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors, screenNames } from './src/constants'
import NvForgotPassword from './src/navigation/NvForgotPassword'
import NvForgotPasswordSubmit from './src/navigation/NvForgotPasswordSubmit'
import NvPasswordResetSuccessful from './src/navigation/NvPasswordResetSuccessful'
import NvAccountHome from './src/navigation/NvAccountHome'
import { typeDefs } from './src/graphql/typedef'
import { cache } from './src/graphql/cache'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import NvAddAccount from './src/navigation/NvAddAccount'

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
}

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/dev/graphql',
  cache,
  typeDefs,
  defaultOptions
});

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
  const initialParams = {
    locale: 'en-CA'
  }
  return (
    <ApolloProvider client={apolloClient}>
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
              initialRouteName={screenNames.home}
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen name={screenNames.login} component={NvLogin} initialParams={initialParams} />
              <Stack.Screen name={screenNames.signup} component={NvSignup} initialParams={initialParams} />
              <Stack.Screen name={screenNames.signupconfirmation} component={NvSignupConfirmation} initialParams={initialParams} />
              <Stack.Screen name={screenNames.forgotPassword} component={NvForgotPassword} initialParams={initialParams} />
              <Stack.Screen name={screenNames.forgotPasswordSubmit} component={NvForgotPasswordSubmit} initialParams={initialParams} />
              <Stack.Screen name={screenNames.passwordResetSuccessful} component={NvPasswordResetSuccessful} initialParams={initialParams} />
              <Stack.Screen name={screenNames.accountHome} component={NvAccountHome} initialParams={initialParams} />
              <Stack.Screen name={screenNames.home} component={NvHome} initialParams={initialParams} />
              <Stack.Screen name={screenNames.addAccount} component={NvAddAccount} initialParams={initialParams} />
            </Stack.Navigator>
        </NavigationContainer>
    </ApolloProvider>  
  );
};


export default App;
