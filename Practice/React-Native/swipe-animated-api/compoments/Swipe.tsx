import React, { useCallback, useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { IData } from '../App';

const { width, height } = Dimensions.get('window');

export const ITEM_SIZE = width * 0.33;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const snapToInterval = Number((ITEM_SIZE + 1.4).toFixed());

interface ISwipeProps {
  inputArr: IData[];
  selectedIndex: number;
  isScrollFinished: boolean;
  scrollX: Animated.Value;
  onPress: (index: number) => void;
  scrollFinished: (value: boolean) => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const Swipe: React.VFC<ISwipeProps> = ({
  inputArr,
  selectedIndex,
  isScrollFinished,
  scrollX,
  onPress,
  scrollFinished,
}) => {
  const $flatList = useRef<FlatList>(null);

  const inputRange = useCallback((index: number) => [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE], []);

  const scrollToCenter = useCallback((index: number) => {
    $flatList.current?.scrollToIndex({ index, viewPosition: 0.5 });
  }, []);

  const handlePress = useCallback((index: number) => {
    onPress(index);
    scrollToCenter(index);
  }, []);

  const cellRendererComponent = useCallback(
    ({ item, index, children, style, ...props }) => {
      const zIndex = scrollX.interpolate({
        inputRange: inputRange(index),
        outputRange: [-1, 10, -1],
      });

      const newStyle = [style, { zIndex }];

      return (
        <Animated.View style={newStyle} index={index} {...props}>
          {children}
        </Animated.View>
      );
    },
    [selectedIndex]
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<IData>) => {
      if (!item.isPoster) {
        return <View style={{ width: SPACER_ITEM_SIZE }} />;
      }

      const translateY = scrollX.interpolate({
        inputRange: inputRange(index),
        outputRange: [0, ITEM_SIZE * 0.53, 0],
        extrapolate: 'clamp',
      });

      const scale = scrollX.interpolate({
        inputRange: inputRange(index),
        outputRange: [1, 1.83, 1],
        extrapolate: 'clamp',
      });

      const currentIndex = index === selectedIndex;

      return (
        <AnimatedTouchableOpacity
          activeOpacity={1}
          onPress={() => handlePress(index)}
          style={[
            styles.imageContainer,
            {
              transform: [{ translateY }, { scale }],
            },
          ]}
        >
          <Animated.Image
            style={[styles.image]}
            resizeMode={'cover'}
            source={{
              uri: item.uri,
            }}
            blurRadius={isScrollFinished && currentIndex ? 0 : 10}
          />
        </AnimatedTouchableOpacity>
      );
    },
    [handlePress, selectedIndex, isScrollFinished]
  );

  const keyExtractor = useCallback((item: IData) => item.id, []);

  const onSCrollBeginDrag = useCallback(() => {
    scrollFinished(false);
  }, []);

  const onScrollEndDrag = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { targetContentOffset } = nativeEvent;

    const currentIndex = targetContentOffset!.x / snapToInterval + 1;

    onPress(currentIndex);
    scrollFinished(true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        CellRendererComponent={cellRendererComponent}
        ref={$flatList}
        snapToInterval={snapToInterval}
        pagingEnabled
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={styles.flatList}
        horizontal
        data={inputArr}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={onScrollEndDrag}
        onScrollBeginDrag={onSCrollBeginDrag}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
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
  imageContainer: {
    height: ITEM_SIZE,
    width: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,

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
