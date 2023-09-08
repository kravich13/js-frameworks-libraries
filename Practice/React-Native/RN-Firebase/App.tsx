import * as WebBrowser from 'expo-web-browser';
import { AuthGoogleProvider } from './src/contexts';
import { Navigation } from './src/navigation';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <AuthGoogleProvider>
      <SafeAreaProvider>
        <Navigation />

        <StatusBar />
      </SafeAreaProvider>
    </AuthGoogleProvider>
  );
}
