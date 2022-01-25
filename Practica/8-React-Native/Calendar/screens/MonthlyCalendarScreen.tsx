import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';
import React, { FC, useCallback, useMemo, useRef } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { DaysWeek } from '../components/CalendarScreens/DaysWeek';
import { Month } from '../components/CalendarScreens/Month';
import { View } from '../components/ThemesAndStyles';
import { globalStyles } from '../globalStyles';
import { useRefreshing } from '../hooks';
import { RootStackScreenProps } from '../types';

export const MonthlyCalendar: FC<RootStackScreenProps<'Month'>> = ({ route, navigation }) => {
  const { selectedMonth } = route.params;

  const refreshing = useRefreshing();
  const months = useMemo(() => _.range(1, 13), []);
  const $flatList = useRef<FlatList | null>(null);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<number>) => {
    return <Month monthNumber={item} littleMonth={false} />;
  }, []);

  const keyExtractor = useCallback((key: number) => String(key), []);

  const scrollToIndex = () => $flatList.current?.scrollToIndex({ index: selectedMonth - 1 });

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => scrollToIndex(), 500);
    }, [scrollToIndex])
  );

  const onScrollToIndexFailed = useCallback(() => {
    setTimeout(() => scrollToIndex(), 500);
  }, [scrollToIndex]);

  return (
    <View style={globalStyles.container}>
      <DaysWeek />
      <FlatList
        ref={$flatList}
        refreshControl={<RefreshControl {...refreshing} />}
        data={months}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    </View>
  );
};
