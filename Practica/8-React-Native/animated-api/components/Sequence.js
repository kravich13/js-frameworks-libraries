import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Sequence = () => {
  const leftValue = useRef(new Animated.Value(0)).current;
  const topValue = useRef(new Animated.Value(0)).current;

  const moveTo = (value, toValue) =>
    Animated.timing(value, {
      toValue,
      duration: 1000,
      useNativeDriver: true,
    });

  const moveBall = () => {
    const anim1 = moveTo(leftValue, 100);
    const anim2 = moveTo(topValue, 200);
    const anim3 = moveTo(leftValue, -100);
    const anim4 = moveTo(topValue, 0);

    Animated.sequence([anim1, anim2, anim3, anim4]).start();
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
