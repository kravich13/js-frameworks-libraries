import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const TwoTranslation = () => {
  const animation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, { duration: 1000 }, () => {
            animation.value = 0;
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          animation.value = 200;
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
