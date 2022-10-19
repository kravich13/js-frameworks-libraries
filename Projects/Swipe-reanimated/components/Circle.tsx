import React, { useCallback, useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { IData } from '../App';
import { ITEM_SIZE } from '../sizes/sizes';

interface ICircle {
  selectedIndex: number;
  isScrollFinished: boolean;
  scrollX: Animated.SharedValue<number>;
  index: number;
  item: IData;
  handlePress: (index: number) => void;
}

export const Circle: React.VFC<ICircle> = ({ isScrollFinished, scrollX, selectedIndex, index, item, handlePress }) => {
  const inputRange = useMemo(() => [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE], [index]);

  const translateY = useDerivedValue(
    () => interpolate(scrollX.value, inputRange, [0, ITEM_SIZE * 0.53, 0], Extrapolate.CLAMP),
    [inputRange]
  );
  const scale = useDerivedValue(() => interpolate(scrollX.value, inputRange, [1, 1.83, 1], Extrapolate.CLAMP), [inputRange]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
      {
        scale: scale.value,
      },
    ],
  }));

  const onPress = useCallback(() => {
    handlePress(index);
  }, []);

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Animated.View style={[styles.imageContainer, animatedStyles]}>
        <Image
          style={[styles.image]}
          resizeMode={'cover'}
          source={{
            uri: item.uri,
          }}
          blurRadius={index === selectedIndex && isScrollFinished ? 0 : 10}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
    width: '100%',
  },
  flatList: {
    justifyContent: 'center',
  },
  imageContainer: {
    height: ITEM_SIZE,
    width: ITEM_SIZE,
    borderRadius: ITEM_SIZE,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'firebrick',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
  },
});
