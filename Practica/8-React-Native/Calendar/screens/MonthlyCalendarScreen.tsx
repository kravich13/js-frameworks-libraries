import { useFocusEffect } from '@react-navigation/native';
import _, { last } from 'lodash';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { DaysWeek } from '../components/CalendarScreens/DaysWeek';
import { Month } from '../components/CalendarScreens/Month';
import { View } from '../components/ThemesAndStyles';
import { globalStyles } from '../globalStyles';
import { RootStackScreenProps } from '../types';

const paginationStep = 3;

const initialMonths = (selectedMonth: number) => {
  if (selectedMonth === 1) {
    return _.range(1, paginationStep + 1);
  }
  if (selectedMonth === 12) {
    return _.range(13 - paginationStep, 13);
  }

  return _.range(selectedMonth - 1, selectedMonth + paginationStep - 1);
};

export const MonthlyCalendar: FC<RootStackScreenProps<'Month'>> = ({ route, navigation }) => {
  const { selectedMonth } = route.params;

  const [months, setMonths] = useState(() => initialMonths(selectedMonth));

  const $flatList = useRef<FlatList | null>(null);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<number>) => {
    return <Month monthNumber={item} littleMonth={false} />;
  }, []);

  const keyExtractor = useCallback((key: number) => String(key), []);

  const scrollToIndex = () => {
    $flatList.current?.scrollToIndex({ index: _.indexOf(months, selectedMonth) });
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => scrollToIndex(), 500);
    }, [selectedMonth])
  );

  const onScrollToIndexFailed = useCallback(() => {
    setTimeout(() => scrollToIndex(), 500);
  }, [selectedMonth]);

  const getMonthsDown = () => {
    const lastMonth = _.last(months);

    if (lastMonth && lastMonth < 12) {
      const remainingMonths = 12 - lastMonth;
      const lastAddedMonth = remainingMonths > paginationStep ? paginationStep + 1 : remainingMonths + 1;

      const state = _.range(lastMonth + 1, lastMonth + lastAddedMonth);
      setMonths((prev) => [...prev, ...state]);
    }
  };

  const getMonthsUp = () => {
    const firstMonth = months[0];

    if (firstMonth > 1) {
      const remainingMonths = firstMonth - 1;
      const firstAddedMonth = remainingMonths > paginationStep ? firstMonth - paginationStep : 1;

      const newMonths = _.range(firstAddedMonth, firstMonth);

      setMonths((prev) => [...newMonths, ...prev]);
    }
  };

  return (
    <View style={globalStyles.container}>
      <DaysWeek />
      <FlatList
        ref={$flatList}
        data={months}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={getMonthsDown}
        onEndReachedThreshold={0.45}
        scrollEventThrottle={150}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={onScrollToIndexFailed}
        refreshing={false}
        onRefresh={getMonthsUp}
        maxToRenderPerBatch={2}
        removeClippedSubviews={true}
      />
    </View>
  );
};
