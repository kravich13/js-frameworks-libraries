import _ from 'lodash';
import { DateTime } from 'luxon';
import React, { FC, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Month } from '../components/CalendarScreens/Month';
import { Text, View } from '../components/ThemesAndStyles';
import { Colors } from '../constants';
import { globalStyles } from '../globalStyles';
import { createMonthState } from '../scripts';
import { RootStackScreenProps } from '../types';

const { dark, light } = Colors;

export const BigCalendarScreen: FC<RootStackScreenProps<'Root'>> = ({ navigation }) => {
  const dateTime = DateTime.now();
  const months = useMemo(() => _.range(1, 13), []);
  const state = createMonthState(dateTime.year, 1, 12);
  console.log(state);

  createMonthState(dateTime.year, 1, 12);

  const renderItem = useCallback((monthNumber: number, index: number) => {
    return <Month dateTime={dateTime} monthNumber={monthNumber} littleMonth={true} key={String(index)} />;
  }, []);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text style={[styles.textYear]}>{dateTime.year}</Text>

      <View style={[styles.breakYear]} lightColor={light.container} darkColor={dark.container} />

      <View style={styles.calendar}>{months.map(renderItem)}</View>
    </View>
  );
};

// test

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
