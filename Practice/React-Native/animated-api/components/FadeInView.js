import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

export const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return <Animated.View style={[styles.container, { opacity: fadeAnim, useNativeDriver: true }]}>{props.children}</Animated.View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    padding: 50,
  },
});
