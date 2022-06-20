import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { IData } from '../App';
import { ITEM_SIZE } from './Swipe';

interface ITitlesProps {
  inputArr: IData[];
  selectedIndex: number;
  isScrollFinished: boolean;
  scrollX: Animated.Value;
}

const ITEM_WIDTH = 150;
const DEFAULT_RANGE = Number((ITEM_WIDTH / 2).toFixed());

export const Titles: React.VFC<ITitlesProps> = ({ inputArr, selectedIndex, isScrollFinished, scrollX }) => {
  const $scrollView = useRef<ScrollView>(null);

  const outputRange = useMemo(() => inputArr.map((arr, index) => ITEM_WIDTH * (index + 1)), [inputArr.length]);

  const translateX = useMemo(
    () =>
      scrollX.interpolate({
        inputRange: inputArr.map((elem, index) => index * ITEM_SIZE),
        outputRange,
      }),
    [inputArr]
  );

  const renderItem = useCallback(
    (item, index) => {
      const currentIndex = index === selectedIndex;

      return (
        <View key={item.id} style={[styles.containerText, !!item.title && { borderBottomColor: 'black', borderBottomWidth: 1 }]}>
          <Animated.Text style={[styles.text, currentIndex && styles.selectedIndexText]}>{item.title}</Animated.Text>
        </View>
      );
    },
    [inputArr, selectedIndex, isScrollFinished]
  );

  useEffect(() => {
    if (isScrollFinished) {
      const countElements = outputRange.length - 2;
      const posXLeft = Number((selectedIndex * ITEM_WIDTH - DEFAULT_RANGE).toFixed());
      const posXRight = selectedIndex * ITEM_WIDTH - ITEM_WIDTH - DEFAULT_RANGE / 2;

      if (selectedIndex === 1) {
        $scrollView.current!.scrollTo({ x: DEFAULT_RANGE });
      } else if (selectedIndex === countElements) {
        const x = Number((selectedIndex * ITEM_WIDTH - DEFAULT_RANGE).toFixed());
        $scrollView.current!.scrollTo({ x: posXRight });
      } else {
        const isEvenLenght = countElements % 2;
        const leftRange = isEvenLenght ? (countElements + 1) / 2 : countElements / 2;

        $scrollView.current!.scrollTo({ x: selectedIndex <= leftRange ? posXLeft : posXRight });
      }
    }
  }, [isScrollFinished, selectedIndex, outputRange]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal ref={$scrollView} scrollEnabled={false}>
        {inputArr.map(renderItem)}

        <Animated.View style={[styles.line, { transform: [{ translateX }] }]} />
      </ScrollView>
    </View>
  );
};

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
    width: ITEM_WIDTH,
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
  },
  selectedIndexText: {
    color: 'red',
  },
  line: {
    top: 24,
    height: 5,
    width: ITEM_WIDTH,
    backgroundColor: 'firebrick',
    position: 'absolute',
  },
});
