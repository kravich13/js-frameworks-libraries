import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const TransformTranslate = () => {
  const leftValue = useRef(new Animated.Value(0)).current;
  const topValue = useRef(new Animated.Value(0)).current;

  const moveBall = () => {
    Animated.timing(leftValue, {
      toValue: 500,
      duration: 5000,
      useNativeDriver: true,
    }).start();

    Animated.timing(topValue, {
      toValue: 500,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Animated.View style={{ transform: [{ translateX: leftValue }, { translateY: topValue }] }}>
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
