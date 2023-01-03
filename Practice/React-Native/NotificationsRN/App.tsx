import React, { useCallback, useEffect } from 'react';
import { AppState, SafeAreaView, ScrollView, StatusBar, useColorScheme, View } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';

OneSignal.setLogLevel(6, 0);
OneSignal.setAppId('5b1503d8-3fae-413d-9902-41676173294d');

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const sendNotification = useCallback(async () => {
    const { userId } = await OneSignal.getDeviceState();

    const jsonString = JSON.stringify({
      contents: { en: 'Evhenyi Belyi' },
      include_player_ids: [userId],
    });

    OneSignal.postNotification(
      jsonString,
      (success) => {
        console.log('Success:', success);
      },
      (error) => {
        console.log('Error:', error);
      },
    );
  }, []);

  useEffect(() => {
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log(notification.action.type);
    });

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background') {
        sendNotification();
      }
    });

    return () => {
      OneSignal.clearOneSignalNotifications();
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />

        <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
