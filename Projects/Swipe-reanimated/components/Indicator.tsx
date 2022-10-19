import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { ITEM_SIZE, TITLE_ELEM_WIDTH } from '../sizes/sizes';
import { IMeasure } from './Titles';

import Animated, { interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

interface IIndicator {
  measures: IMeasure[];
  scrollX: Animated.SharedValue<number>;
}

export const Indicator: React.VFC<IIndicator> = ({ measures, scrollX }) => {
  const measuresWithoutSpacers = useMemo(
    () => measures.filter((elem, index, arr) => index > 0 && index < arr.length - 1),
    [measures]
  );
  const translateX = useDerivedValue(
    () =>
      interpolate(
        scrollX.value,
        measuresWithoutSpacers.map((arr, index) => index * ITEM_SIZE),
        measuresWithoutSpacers.map((measure) => measure.x)
      ),
    [measuresWithoutSpacers]
  );

  const width = useDerivedValue(
    () =>
      interpolate(
        scrollX.value,
        measuresWithoutSpacers.map((arr, index) => index * ITEM_SIZE),
        measuresWithoutSpacers.map((measure) => measure.width)
      ),
    [measuresWithoutSpacers]
  );

  const animatedStyles = useAnimatedStyle(() => ({
    width: width.value,
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return <Animated.View style={[styles.line, animatedStyles]} />;
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
