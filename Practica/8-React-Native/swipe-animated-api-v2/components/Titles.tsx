import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { IData } from '../App';
import { Indicator } from './Indicator';
import { TITLE_ELEM_WIDTH } from './Swipe';
import { Title } from './Title';

interface ITitlesProps {
  inputArr: IData[];
  selectedIndex: number;
  isScrollFinished: boolean;
  scrollX: Animated.Value;
}

export interface IMeasure {
  x: number;
  y: number;
  width: number;
  height: number;
}

const DEFAULT_RANGE = Number((TITLE_ELEM_WIDTH / 2).toFixed());

export const Titles: React.VFC<ITitlesProps> = ({ inputArr, scrollX, isScrollFinished, selectedIndex }) => {
  const $scrollView = useRef<ScrollView>(null);

  const [measures, setMeasures] = useState<IMeasure[]>([]);

  const scrollTo = useCallback((x: number) => {
    const id = setTimeout(() => {
      $scrollView.current!.scrollTo({ x });
    }, 700);
  }, []);

  const renderTitle = useCallback((item: IData) => {
    return <Title key={item.id} item={item} ref={item.ref} />;
  }, []);

  useEffect(() => {
    if (isScrollFinished) {
      const countElements = inputArr.length - 2;
      const posXLeft = Number((selectedIndex * TITLE_ELEM_WIDTH - DEFAULT_RANGE).toFixed());
      const posXRight = selectedIndex * TITLE_ELEM_WIDTH - TITLE_ELEM_WIDTH - DEFAULT_RANGE / 2;

      if (selectedIndex === 1) {
        scrollTo(DEFAULT_RANGE);
      } else if (selectedIndex === countElements) {
        scrollTo(posXRight);
      } else {
        const isEvenLenght = countElements % 2;
        const leftRange = isEvenLenght ? (countElements + 1) / 2 : countElements / 2;

        scrollTo(selectedIndex <= leftRange ? posXLeft : posXRight);
      }
    }
  }, [isScrollFinished, selectedIndex, inputArr.length, scrollTo]);

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
      <ScrollView horizontal ref={$scrollView} scrollEnabled={false} style={{ position: 'relative' }}>
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
  containerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 5,
    width: TITLE_ELEM_WIDTH,
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
    width: TITLE_ELEM_WIDTH,
    backgroundColor: 'firebrick',
    position: 'absolute',
  },
});
