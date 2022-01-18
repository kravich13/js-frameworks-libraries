import _ from 'lodash';
import React, { FC, useCallback } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { DaysWeek } from '../components/CalendarScreens/DaysWeek';
import { Month } from '../components/CalendarScreens/Month';
import { View } from '../components/ThemesAndStyles/Themed';
import { globalStyles } from '../globalStyles';
import { useRefreshing } from '../hooks';

export const MonthlyCalendar: FC = () => {
  const refreshing = useRefreshing();

  const months = _.range(1, 13);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<number>) => {
    return <Month monthNumber={item} littleMonth={false} />;
  }, []);

  const keyExtractor = useCallback((key: number) => String(key), []);

  return (
    <View style={globalStyles.container}>
      <FlatList
        ListHeaderComponent={<DaysWeek />}
        refreshControl={<RefreshControl {...refreshing} />}
        data={months}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};
