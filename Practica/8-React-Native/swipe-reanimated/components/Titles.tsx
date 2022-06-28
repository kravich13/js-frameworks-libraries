import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { IData } from '../App';
import { TITLE_ELEM_WIDTH, WHITE_SPACE_WIDTH, SCREEN_WIDTH } from '../sizes/sizes';
import { Indicator } from './Indicator';
import { Title } from './Title';

interface ITitlesProps {
  inputArr: IData[];
  selectedIndex: number;
  isScrollFinished: boolean;
  scrollX: Animated.SharedValue<number>;
}

export interface IMeasure {
  x: number;
  y: number;
  width: number;
  height: number;
}

const DEFAULT_RANGE = Number((WHITE_SPACE_WIDTH / 2).toFixed());

export const Titles: React.VFC<ITitlesProps> = ({ inputArr, scrollX, isScrollFinished, selectedIndex }) => {
  const $scrollView = useRef<ScrollView>(null);

  const [measures, setMeasures] = useState<IMeasure[]>([]);

  const measuresWithoutSpacers = useMemo(
    () => measures.filter((elem, index, arr) => index > 0 && index < arr.length - 1),
    [measures]
  );

  const scrollTo = useCallback((x: number) => {
    const id = setTimeout(() => {
      $scrollView.current!.scrollTo({ x });
    }, 700);
  }, []);

  const renderTitle = useCallback(
    (item: IData, index, arr: IData[]) => (
      <Title key={item.id} item={item} index={index} scrollX={scrollX} ref={item.ref} countOfElements={arr.length - 1} />
    ),
    [selectedIndex]
  );

  useEffect(() => {
    if (isScrollFinished && measuresWithoutSpacers.length) {
      const countElements = measuresWithoutSpacers.length;
      const isEvenLenght = countElements % 2;
      const leftRange = isEvenLenght ? (countElements + 1) / 2 : countElements / 2;

      if (selectedIndex <= leftRange) {
        const prevElementsForLeft = measuresWithoutSpacers.filter((item, index) => index + 1 < selectedIndex);
        const leftX = prevElementsForLeft.reduce((prev, current) => prev + current.width, DEFAULT_RANGE);

        scrollTo(leftX);
      } else {
        const prevElementsForRight = measuresWithoutSpacers.filter((item, index) => index + 1 > selectedIndex);
        const WIDTH_TITLES = measuresWithoutSpacers.reduce((prev, current) => prev + current.width, 0);
        const DEFAULT_RIGHT_X = WHITE_SPACE_WIDTH * 2 + WIDTH_TITLES - SCREEN_WIDTH - DEFAULT_RANGE;
        const rightX = DEFAULT_RIGHT_X - prevElementsForRight.reduce((prev, current) => prev + current.width, 0);

        scrollTo(rightX);
      }
    }
  }, [isScrollFinished, selectedIndex, measuresWithoutSpacers]);

  useEffect(() => {
    const m: IMeasure[] = [];

    inputArr.forEach((item) => {
      item.ref.current?.measureLayout(
        $scrollView?.current as any,
        (x, y, width, height) => {
          m.push({ x, y, width, height });

          if (m.length === inputArr.length) {
            setMeasures(m);
          }
        },
        () => {}
      );
    });
  }, [inputArr, selectedIndex]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal ref={$scrollView} scrollEnabled={true} style={styles.scrollView}>
        {inputArr.map(renderTitle)}

        {measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 23,
  },
  scrollView: {
    position: 'relative',
  },
});
