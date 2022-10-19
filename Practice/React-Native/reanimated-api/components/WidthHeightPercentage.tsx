import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

export const WidthHeightPercentage = () => {
  const animation = useSharedValue(0);

  const width = useDerivedValue(() => {
    return interpolate(animation.value, [0, 1], [20, 80]);
  });

  const height = useDerivedValue(() => {
    return interpolate(animation.value, [0, 1], [15, 65]);
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value + '%',
      height: height.value + '%',
    };
  });

  const startAnimation = () => {
    withTiming(1, {
      duration: 2000,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={startAnimation}>
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
