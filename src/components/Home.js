import React, { useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import { colors, icons, screenNames, values } from '../constants'
import { useQuery } from '@apollo/client'
import { signOut } from '../services/auth'
import { localQueries } from '../services/graphqlQueryBuilder'
import { NavigationContainer } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NvAccountHome from '../navigation/NvAccountHome'

const Tab = createBottomTabNavigator();

const Home = ({ signOutSuccess }) =>  {
    const [signingOut, setSigningOut] = useState(false)
    const { data } = useQuery(localQueries.loggedInUserId())
    const handleSignOutSuccess = useCallback(() => {
        setSigningOut(false)
        signOutSuccess()
    })
    const handleSignOutFailure = useCallback((error) => {
        setSigningOut(false)
        console.log(error)
    })
    const handleSignOut = useCallback(async () => {
        setSigningOut(true)
        await signOut(handleSignOutSuccess, handleSignOutFailure)
    })

  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                borderTopColor: colors.lightgrey,
            },
            indicatorStyle: {
                width: 0, height: 0, elevation: 0,      
            },
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === screenNames.accountHome) {
                iconName = icons.account
            } else if (route.name === screenNames.networth) {
                iconName = icons.networth
            } else if (route.name === screenNames.budget) {
                iconName = icons.budget
            } else if (route.name === screenNames.profile) {
                iconName = icons.profile
            }
            // You can return any component that you like here!
            return <Icon name={iconName} size={25} color={color} />;
            },
            tabBarActiveTintColor: colors.black,
            tabBarInactiveTintColor: colors.grey,
        })}
    >
        <Tab.Screen name={screenNames.accountHome} component={NvAccountHome} />
        <Tab.Screen name={screenNames.networth} component={NvAccountHome} />
        <Tab.Screen name={screenNames.budget} component={NvAccountHome} />
        <Tab.Screen name={screenNames.profile} component={NvAccountHome} />
    </Tab.Navigator>
  );
}

export default Home;
