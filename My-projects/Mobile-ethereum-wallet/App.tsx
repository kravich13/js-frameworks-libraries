import './shim';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { withWalletConnect } from '@walletconnect/react-native-dapp';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import { useCryptoAlert } from './src/hooks/useCryptoAlert';
import Navigation from './src/navigation';

function App() {
  useCryptoAlert();

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withWalletConnect(App, {
  redirectUrl: Platform.OS === 'web' ? window.location.origin : 'yourappscheme://',
  storageOptions: {
    asyncStorage: AsyncStorage as any,
  },
  bridge: 'https://mainnet.infura.io/v3/b5f2c21f38084eb68699da3ad20ed6a1',
});
