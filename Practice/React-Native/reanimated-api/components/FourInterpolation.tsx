import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const FourInterpolation = () => {
  const animation = useSharedValue(0);

  const animationColor = useDerivedValue(() => {
    return interpolateColor(animation.value, [0, 1], ['red', 'green']);
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: animationColor.value,
    };
  });

  const startAnimation = () => {
    animation.value = withTiming(1, {
      duration: 5000,
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
