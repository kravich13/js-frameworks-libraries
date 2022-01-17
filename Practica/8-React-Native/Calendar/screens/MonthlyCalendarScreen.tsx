import _ from 'lodash';
import React from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl, StyleSheet } from 'react-native';
import { Month } from '../components/CalendarScreens/Month';
import { Text, View } from '../components/ThemesAndStyles/Themed';
import { globalStyles } from '../globalStyles';
import { useRefreshing } from '../hooks';

export const MonthlyCalendar = () => {
  const refreshing = useRefreshing();

  const months = _.range(1, 4);
  const daysWeek: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const renderDaysWeek = (day: string, index: number) => {
    return (
      <Text style={styles.daysWeek} key={String(index)}>
        {day}
      </Text>
    );
  };

  const renderMonts = ({ item }: ListRenderItemInfo<number>) => <Month monthNumber={item} littleMonth={false} />;

  const keyExtractor = (item: number, index: number) => String(index);

  return (
    <View style={globalStyles.container}>
      <View style={styles.containerWeek}>{daysWeek.map(renderDaysWeek)}</View>

      <FlatList
        refreshControl={<RefreshControl {...refreshing} />}
        data={months}
        renderItem={renderMonts}
        keyExtractor={keyExtractor}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerWeek: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  daysWeek: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
  },
});
