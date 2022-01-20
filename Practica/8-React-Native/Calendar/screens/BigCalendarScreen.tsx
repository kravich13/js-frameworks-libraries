import _ from 'lodash';
import { DateTime } from 'luxon';
import React, { FC, useCallback, useMemo } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { Month } from '../components/CalendarScreens/Month';
import { ScrollView, Text, View } from '../components/ThemesAndStyles';
import { Colors } from '../constants';
import { globalStyles } from '../globalStyles';
import { useRefreshing } from '../hooks';
import { RootStackScreenProps } from '../types';

const { dark, light } = Colors;

export const BigCalendar: FC<RootStackScreenProps<'Root'>> = ({ navigation }) => {
  const refreshing = useRefreshing();
  const months = useMemo(() => _.range(1, 13), []);

  const currentYear = DateTime.now().year;

  const renderItem = useCallback((monthNumber: number, index: number) => {
    return <Month monthNumber={monthNumber} littleMonth={true} key={String(index)} />;
  }, []);

  return (
    <ScrollView style={[globalStyles.container, styles.container]} refreshControl={<RefreshControl {...refreshing} />}>
      <Text style={[styles.textYear]}>{currentYear}</Text>

      <View style={[styles.breakYear]} lightColor={light.container} darkColor={dark.container} />

      <View style={styles.calendar}>{months.map(renderItem)}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  textYear: {
    color: '#ff4500',
    fontWeight: '600',
    fontSize: 35,
  },
  breakYear: {
    height: 1,
    marginBottom: 20,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
