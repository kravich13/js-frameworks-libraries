import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { FourInterpolation } from './components/FourInterpolation';
import { Rotation } from './components/Rotation';
import { ThreeWidthHeight } from './components/ThreeWidthHeight';
import { TwoTranslation } from './components/TwoTranslation';
import { WidthHeightPercentage } from './components/WidthHeightPercentage';
import { PanGesture } from './components/PanGesture';

export default function App() {
  return (
    <View style={styles.container}>
      <PanGesture />
      {/* <WidthHeightPercentage /> */}
      {/* <Rotation /> */}
      {/* <FourInterpolation /> */}
      {/* <ThreeWidthHeight /> */}
      {/* <TwoTranslation /> */}
      {/* <OneOpacity /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
