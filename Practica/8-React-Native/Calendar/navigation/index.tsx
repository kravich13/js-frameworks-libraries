import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ColorSchemeName, Text } from 'react-native';
import { NavigationContextProvider } from '../context';
import { BigCalendarScreen, DayScreen, MonthlyCalendarScreen, NotFoundScreen } from '../screens';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <NavigationContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BigCalendarScreen}
          options={{
            title: 'Calendar',
            animation: 'flip',
          }}
        />
        <Stack.Screen
          name="Month"
          component={MonthlyCalendarScreen}
          options={{
            title: 'Monthly calendar',
            animation: 'flip',
          }}
        />
        <Stack.Screen
          name="Day"
          component={DayScreen}
          options={{
            title: 'Day',
            animation: 'flip',
          }}
        />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
    </NavigationContextProvider>
  );
}
