import React, { useCallback, useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { IData } from '../App';

const { width } = Dimensions.get('window');

export const ITEM_SIZE = width * 0.33;
export const TITLE_ELEM_WIDTH = 150;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const snapToInterval = Number((ITEM_SIZE + 1.4).toFixed());

interface ISwipeProps {
  inputArr: IData[];
  selectedIndex: number;
  scrollX: Animated.Value;
  setSelectedIndex: (index: number) => void;
  scrollFinished: (value: boolean) => void;
}

export const Swipe: React.VFC<ISwipeProps> = ({ inputArr, selectedIndex, scrollX, setSelectedIndex, scrollFinished }) => {
  const $flatList = useRef<FlatList>(null);

  const inputRange = useCallback((index: number) => [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE], []);

  const handlePress = useCallback((index: number) => {
    setSelectedIndex(index);

    $flatList.current?.scrollToOffset({ offset: (index - 1) * snapToInterval });
  }, []);

  const cellRendererComponent = useCallback(({ item, index, children, style, ...props }) => {
    const zIndex = scrollX.interpolate({
      inputRange: inputRange(index),
      outputRange: [-1, 10, -1],
    });

    return (
      <Animated.View style={[style, { zIndex }]} index={index} {...props}>
        {children}
      </Animated.View>
    );
  }, []);

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

      return (
        <TouchableOpacity onPress={() => handlePress(index)} activeOpacity={1}>
          <Animated.View
            style={[
              styles.imageContainer,
              {
                transform: [{ translateY }, { scale }],
              },
            ]}
          >
            <Image
              style={[styles.image]}
              resizeMode={'cover'}
              source={{
                uri: item.uri,
              }}
              blurRadius={index === selectedIndex ? 0 : 10}
            />
          </Animated.View>
        </TouchableOpacity>
      );
    },
    [selectedIndex]
  );

  const keyExtractor = useCallback((item: IData) => item.id, []);

  const onSCrollBeginDrag = useCallback(() => {
    scrollFinished(false);
  }, []);

  const onScrollEndDrag = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { targetContentOffset } = nativeEvent;

    const currentIndex = targetContentOffset!.x / snapToInterval + 1;

    setSelectedIndex(currentIndex);
    scrollFinished(true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={$flatList}
        CellRendererComponent={cellRendererComponent}
        snapToInterval={snapToInterval}
        decelerationRate={0}
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
