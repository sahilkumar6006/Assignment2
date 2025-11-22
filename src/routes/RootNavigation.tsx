import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './constants';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import { IStackParamsList } from './types';
import '../lang/i18n';

const Stack = createNativeStackNavigator<IStackParamsList>();

export const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Routes.HomeScreen} screenOptions={{ headerShown: false }}>
                <Stack.Screen name={Routes.HomeScreen} component={HomeScreen} />
                <Stack.Screen name={Routes.CartScreen} component={CartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}