import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FadeInView } from './components/FadeInView';

export default function App(props) {
  return (
    <View style={styles.container}>
      <FadeInView>
        <Text>HELLO</Text>
      </FadeInView>
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
