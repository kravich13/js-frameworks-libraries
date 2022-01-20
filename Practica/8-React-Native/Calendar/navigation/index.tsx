import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ColorSchemeName } from 'react-native';
import { Text, View } from '../components/ThemesAndStyles';
import { BigCalendar, MonthlyCalendar, NotFoundScreen } from '../screens';
import { RootStackParamList } from '../types';
import { MonthlyHeader } from './customHeaders/monthly/MonthlyHeader';
import LinkingConfiguration from './LinkingConfiguration';
import { getHeaderTitle, HeaderBackButton } from '@react-navigation/elements';

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
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BigCalendar}
        options={{
          title: 'Calendar',
          headerTitleAlign: 'center',
          animation: 'flip',
        }}
      />
      <Stack.Screen
        name="Month"
        component={MonthlyCalendar}
        options={{
          title: 'Monthly calendar',
          headerTitleAlign: 'center',
          animation: 'flip',

          headerBackTitle: '2022',

          // headerLeft: ({ label }) => {
          //   return <Text>{label}</Text>;
          // },
          // header: ({ navigation, route, options, back }) => {
          //   const title = getHeaderTitle(options, route.name);

          //   options.headerTitleAlign = 'center';

          //   return <MonthlyHeader title={title} leftButtonTitle={back?.title} navigation={navigation} />;
          // },
        }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  );
}
