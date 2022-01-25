import { StatusBar } from 'expo-status-bar';
import 'intl';
import 'intl/locale-data/jsonp/en';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Context } from './context';
import { useCachedResources, useColorScheme } from './hooks';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Context.Provider value={{ colorScheme }}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </Context.Provider>
  );
}
