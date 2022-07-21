import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Button, ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { OpenCameraForQRCodeScreen } from '../screens/OpenCameraForQRCodeScreen';
import { WalletDataScreen } from '../screens/WalletDataScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { AntDesign } from '@expo/vector-icons';
import { HeaderLeft } from '../components/header/HeaderLeft';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const headerTintColor = 'crimson';

  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={OpenCameraForQRCodeScreen} options={{ title: 'ETH private key', headerTintColor }} />
      <Stack.Screen
        name="WalletData"
        component={WalletDataScreen}
        options={({ navigation, route }) => ({
          title: 'Wallet data',
          headerBackTitle: 'Back to QR',
          headerTintColor,
          headerLeft: () => <HeaderLeft headerTintColor={headerTintColor} />,
        })}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!', headerTintColor: 'crimson' }} />
    </Stack.Navigator>
  );
}
