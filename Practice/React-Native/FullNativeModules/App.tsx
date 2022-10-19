import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
  NativeEventEmitter,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const {MyModule, Counter} = NativeModules;

const CounterEvents = new NativeEventEmitter(Counter);

// console.log(MyModule?.multiplyReturn(13, 14));

// (async () => {
//   const result = await MyModule.sampleMethod();
//   console.log(result);
// })();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [numberNM, setNumberNM] = useState<number>(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const multilyData = useCallback(async () => {
    const data = await MyModule?.asyncMultiply(13, 14);
    setNumberNM(data as number);
  }, []);

  useEffect(() => {
    multilyData();

    // MyModule?.multiply(13, 14, (res: number) => {
    //   setNumberNM(res);
    // });

    CounterEvents.addListener('onIncrement', (res: any) => {
      console.log('MODULES_EVENT_DATA', res);
    });

    return () => CounterEvents.removeAllListeners('onIncrement');
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle, {flexGrow: 1}]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'red', marginBottom: 10}}>
            Callback data from Native Modules
          </Text>

          <Text
            style={{
              color: 'red',
              fontSize: 16,
              textShadowColor: 'white',
              textDecorationLine: 'underline',
            }}>
            {numberNM}
          </Text>

          <Button
            title="increment"
            onPress={() => Counter.increment((res: any) => {})}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
