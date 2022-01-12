import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Context } from './context';
import { useColorScheme } from './hooks';
import { useCachedResources } from './hooks';
import Navigation from './navigation';

import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

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
