import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const PanGesture = () => {
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event, context: any) => {
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
    },
    onEnd: () => {
      x.value = withSpring(startingPosition, {
        mass: 5,
      });
      y.value = withSpring(startingPosition, {
        mass: 5,
      });
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </PanGestureHandler>
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
