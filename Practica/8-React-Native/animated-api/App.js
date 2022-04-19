import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanResponderComponent, MoveElement, Sequence, TaskAnimation, TranformTranslate } from './components/';

export default function App(props) {
  return (
    <View style={styles.container}>
      <TaskAnimation />
      {/* <FadeInOut /> */}
      {/* <PanResponderComponent /> */}
      {/* <MoveElement /> */}
      {/* <FadeInView>
        <Text>HELLO</Text>
      </FadeInView> */}
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
  block: {
    backgroundColor: 'green',
    padding: 50,
  },
});
