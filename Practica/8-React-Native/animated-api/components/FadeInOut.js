import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const FadeInOut = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeInBall = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutBall = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Animated.View style={{ opacity }}>
        <View style={styles.container} />
      </Animated.View>

      <TouchableOpacity onPress={fadeInBall}>
        <Text>Fade in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={fadeOutBall}>
        <Text>Fade out</Text>
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
