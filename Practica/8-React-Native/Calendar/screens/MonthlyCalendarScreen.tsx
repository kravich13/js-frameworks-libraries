import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { Month } from '../components/CalendarScreens/Month';
import { SmallMonth } from '../components/CalendarScreens/SmallMonth';
import { Text, View } from '../components/ThemesAndStyles/Themed';
import { globalStyles } from '../globalStyles';
import { useRefreshing } from '../hooks';

export const MonthlyCalendar = () => {
  const navigation = useNavigation();
  const refreshing = useRefreshing();

  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const renderItem = ({ item }: ListRenderItemInfo<number>) => <SmallMonth monthNumber={item} />;
  const keyExtractor = (item: number, index: number) => String(index);

  return (
    <View style={[globalStyles.container]}>
      <FlatList
        refreshControl={<RefreshControl {...refreshing} />}
        data={months}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};
