import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const ThreeWidthHeight = () => {
  const animation = useSharedValue({ width: 100, height: 100 });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(animation.value.width, { duration: 1000 }, () => {}),
      height: withTiming(animation.value.height, { duration: 1000 }, () => {
        animation.value = { width: 100, height: 100 };
      }),
    };
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          animation.value = { width: 300, height: 450 };
        }}
      >
        <Animated.View style={[styles.box, animatedStyles]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
});
