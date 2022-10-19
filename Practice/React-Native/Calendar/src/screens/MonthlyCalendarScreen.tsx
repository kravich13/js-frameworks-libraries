import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';
import { DateTime } from 'luxon';
import React, { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { DaysWeek, Month } from '../components/CalendarScreens';
import { View } from '../components/ThemesAndStyles';
import { globalStyles } from '../globalStyles';
import { IMonthOrDay_State } from '../interfaces';
import { monthState } from '../scripts';
import { RootStackScreenProps } from '../types';

const paginationStep = 3;

const initialMonths = (year: number, month: number) => {
  if (month === 1) {
    return monthState(year, 1, paginationStep);
  }
  if (month === 12) {
    return monthState(year, 13 - paginationStep, 12);
  }

  return monthState(year, month, month + paginationStep - 1);
};

export const MonthlyCalendarScreen: FC<RootStackScreenProps<'Month'>> = ({ route, navigation }) => {
  const { selectedDate } = route.params;

  const dateTime = DateTime.fromMillis(selectedDate);

  const [months, setMonths] = useState(() => initialMonths(dateTime.year, dateTime.month));
  const $flatList = useRef<FlatList | null>(null);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<IMonthOrDay_State>) => {
    return <Month fullDate={item.fullDate} littleMonth={false} />;
  }, []);

  const keyExtractor = useCallback((item: IMonthOrDay_State) => item.id, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerBackTitle: String(dateTime.year) });
  }, [navigation]);

  const scrollToIndex = (index: number) => {
    setTimeout(() => {
      $flatList.current?.scrollToIndex({ index: index });
    }, 500);
  };

  useFocusEffect(
    useCallback(() => {
      if (dateTime.month === 12) {
        scrollToIndex(months.length - 1);
      }
    }, [selectedDate])
  );

  const onScrollToIndexFailed = useCallback(() => {
    if (dateTime.month === 12) {
      scrollToIndex(months.length - 1);
    }
  }, [selectedDate]);

  const getMonthsDown = (info: { distanceFromEnd: number }) => {
    const lastMonth = DateTime.fromMillis(_.last(months)!.fullDate).month;

    if (lastMonth && lastMonth < 12) {
      const remainingMonths = 12 - lastMonth;
      const lastAddedMonth = remainingMonths > paginationStep ? paginationStep + 1 : remainingMonths + 1;

      const state = monthState(dateTime.year, lastMonth + 1, lastMonth + lastAddedMonth);

      setMonths((prev) => [...prev, ...state]);
    }
  };

  const getMonthsUp = () => {
    const firstMonth = DateTime.fromMillis(months[0].fullDate).month;

    if (firstMonth > 1) {
      const remainingMonths = firstMonth - 1;
      const firstAddedMonth = remainingMonths > paginationStep ? firstMonth - paginationStep : 1;

      const state = monthState(dateTime.year, firstAddedMonth, remainingMonths);
      setMonths((prev) => [...state, ...prev]);
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
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={getMonthsUp}
        removeClippedSubviews={true}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    </View>
  );
};
