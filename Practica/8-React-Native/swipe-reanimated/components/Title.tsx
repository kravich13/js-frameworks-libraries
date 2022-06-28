import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { IData } from '../App';
import { snapToInterval, WHITE_SPACE_WIDTH } from '../sizes/sizes';

interface ITitle_Props {
  item: IData;
  index: number;
  scrollX: Animated.SharedValue<number>;
  countOfElements: number;
}

export const Title = React.forwardRef<View, ITitle_Props>(({ item, index, scrollX, countOfElements }, ref) => {
  const color = useDerivedValue(
    () =>
      interpolateColor(
        scrollX.value,
        index !== 1
          ? [snapToInterval * (index - 2), snapToInterval * (index - 1), snapToInterval * index]
          : [snapToInterval * (index - 1), snapToInterval * index],
        index !== 1 ? ['black', 'red', 'black'] : ['red', 'black']
      ),
    []
  );

  const animatedStyles = useAnimatedStyle(() => ({
    color: color.value,
  }));

  return (
    <View
      ref={ref}
      style={[
        styles.containerText,
        !!item.title && { borderBottomColor: 'black', borderBottomWidth: 1 },
        !item.title && { width: WHITE_SPACE_WIDTH },
      ]}
    >
      <Animated.Text style={[styles.text, index > 0 && index <= countOfElements && animatedStyles]}>{item.title}</Animated.Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    marginBottom: 23,
  },
  containerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  text: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
    marginHorizontal: 10,
  },
  selectedIndexText: {
    color: 'red',
  },
  line: {
    top: 24,
    height: 5,
    backgroundColor: 'firebrick',
    position: 'absolute',
  },
});
