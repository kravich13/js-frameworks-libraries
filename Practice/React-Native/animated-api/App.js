import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { PanResponderComponent, MoveElement, Sequence, TaskAnimation, TranformTranslate, SoftZoomOnTouch } from './components/';

export default function App(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SoftZoomOnTouch />
        {/* <TaskAnimation /> */}
        {/* <FadeInOut /> */}
        {/* <PanResponderComponent /> */}
        {/* <MoveElement /> */}
        {/* <FadeInView>
        <Text>HELLO</Text>
      </FadeInView> */}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  block: {
    backgroundColor: 'green',
    padding: 50,
  },
});
