import { DateTime } from 'luxon';
import React, { FC, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Month } from '../components/CalendarScreens';
import { Text, View } from '../components/ThemesAndStyles';
import { Colors } from '../constants';
import { globalStyles } from '../globalStyles';
import { IMonthOrDay_State } from '../interfaces';
import { monthState } from '../scripts';
import { RootStackScreenProps } from '../types';

const { dark, light } = Colors;

export const BigCalendarScreen: FC<RootStackScreenProps<'Root'>> = ({ navigation }) => {
  const dateTime = DateTime.now();

  const months = useMemo(() => monthState(dateTime.year, 1, 12), [dateTime.year]);

  const renderItem = useCallback(({ id, fullDate }: IMonthOrDay_State) => {
    return <Month fullDate={fullDate} littleMonth={true} key={id} />;
  }, []);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text style={[globalStyles.currentDayColor, styles.textYear]}>{dateTime.year}</Text>

      <View style={[styles.breakYear]} lightColor={light.container} darkColor={dark.container} />

      <View style={styles.calendar}>{months.map(renderItem)}</View>
    </View>
  );
};

// test

const styles = StyleSheet.create({
  container: {},

  textYear: {
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
