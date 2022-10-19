import React, { useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { ITEM_SIZE, TITLE_ELEM_WIDTH } from './Swipe';
import { IMeasure } from './Titles';

interface IIndicator {
  measures: IMeasure[];
  scrollX: Animated.Value;
}

export const Indicator: React.VFC<IIndicator> = ({ measures, scrollX }) => {
  const inputRange = useMemo(() => measures.map((arr, index) => index * ITEM_SIZE), [measures]);

  const translateX = useMemo(
    () =>
      scrollX.interpolate({
        inputRange,
        outputRange: measures.map((measure) => measure.x + TITLE_ELEM_WIDTH),
      }),
    [measures]
  );

  return <Animated.View style={[styles.line, { transform: [{ translateX }] }]} />;
};

const styles = StyleSheet.create({
  line: {
    top: 24,
    height: 5,
    width: TITLE_ELEM_WIDTH,
    backgroundColor: 'firebrick',
    position: 'absolute',
  },
});
