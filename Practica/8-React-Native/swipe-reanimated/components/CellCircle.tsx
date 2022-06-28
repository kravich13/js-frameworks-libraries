import React from 'react';
import Animated, { interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { ITEM_SIZE } from '../sizes/sizes';

interface ICellCircle {
  index: number;
  children: React.ReactChildren;
  style: any;
  scrollX: Animated.SharedValue<number>;
}

export const CellCircle: React.VFC<ICellCircle> = ({ children, index, style, scrollX }) => {
  const zIndex = useDerivedValue(() =>
    interpolate(scrollX.value, [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE], [-1, 10, -1])
  );

  const animatedStyles = useAnimatedStyle(() => ({ zIndex: zIndex.value }));

  return <Animated.View style={[style, animatedStyles]}>{children}</Animated.View>;
};
