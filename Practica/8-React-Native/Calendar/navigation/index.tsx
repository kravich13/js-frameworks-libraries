import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ColorSchemeName } from 'react-native';
import { NavigationContext } from '../context';
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
    <NavigationContext.Provider value={{ selectedDate: 0 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BigCalendarScreen}
          options={{
            title: 'Calendar',
            headerTitleAlign: 'center',
            animation: 'flip',
          }}
        />
        <Stack.Screen
          name="Month"
          component={MonthlyCalendarScreen}
          options={{
            title: 'Monthly calendar',
            headerTitleAlign: 'center',
            animation: 'flip',
            headerBackTitle: '2022',
          }}
        />
        <Stack.Screen
          name="Day"
          component={DayScreen}
          options={{ title: 'Day', headerTitleAlign: 'center', animation: 'flip' }}
        />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!', headerTitleAlign: 'center' }} />
      </Stack.Navigator>
    </NavigationContext.Provider>
  );
}
