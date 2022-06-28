import React, { useCallback, useRef } from 'react';
import { FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import { IData } from '../App';
import { snapToInterval, SPACER_ITEM_SIZE } from '../sizes/sizes';
import { CellCircle } from './CellCircle';
import { Circle } from './Circle';

interface ISwipeProps {
  inputArr: IData[];
  selectedIndex: number;
  isScrollFinished: boolean;
  scrollX: Animated.SharedValue<number>;
  setSelectedIndex: (index: number) => void;
  scrollFinished: (value: boolean) => void;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const Swipe: React.VFC<ISwipeProps> = ({
  inputArr,
  selectedIndex,
  isScrollFinished,
  scrollX,
  setSelectedIndex,
  scrollFinished,
}) => {
  const $flatList = useRef<any>(null);

  const handlePress = useCallback((index: number) => {
    setSelectedIndex(index);

    $flatList.current.scrollToOffset({ offset: (index - 1) * snapToInterval });
  }, []);

  const cellRendererComponent = useCallback(({ item, index, children, style }) => {
    return <CellCircle index={index} children={children} style={style} scrollX={scrollX} />;
  }, []);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<IData> | any) =>
      item.isPoster ? (
        <Circle
          selectedIndex={selectedIndex}
          isScrollFinished={isScrollFinished}
          scrollX={scrollX}
          index={index}
          item={item}
          handlePress={handlePress}
        />
      ) : (
        <View style={{ width: SPACER_ITEM_SIZE }} />
      ),
    [selectedIndex, isScrollFinished]
  );

  const keyExtractor = useCallback((item: IData | any) => item.id, []);

  const onSCrollBeginDrag = useCallback(() => {
    scrollFinished(false);
  }, []);

  const onScrollEndDrag = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { targetContentOffset } = nativeEvent;

    const currentIndex = targetContentOffset!.x / snapToInterval + 1;

    setSelectedIndex(currentIndex);
    scrollFinished(true);
  }, []);

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        scrollX.value = event.contentOffset.x;
      },
    },
    []
  );

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        CellRendererComponent={cellRendererComponent}
        renderItem={renderItem}
        ref={$flatList}
        snapToInterval={snapToInterval}
        decelerationRate={0}
        bounces={false}
        contentContainerStyle={styles.flatList}
        horizontal
        data={inputArr}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={onScrollEndDrag}
        onScrollBeginDrag={onSCrollBeginDrag}
        onScroll={scrollHandler}
      />
    </View>
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
});
