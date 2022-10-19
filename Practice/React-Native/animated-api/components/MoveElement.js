import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const MoveElement = () => {
  const fadeAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const moveBall = () => {
    Animated.timing(fadeAnim, {
      toValue: { x: 100, y: 100 },
      duration: 5000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <Animated.View style={fadeAnim.getLayout()}>
        <View style={styles.container} />
      </Animated.View>
      <TouchableOpacity onPress={moveBall}>
        <Text>Click me!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
  },
});
