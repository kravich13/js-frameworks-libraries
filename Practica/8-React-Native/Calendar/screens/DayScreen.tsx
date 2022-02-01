import { DateTime } from 'luxon';
import React, { FC, useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { DaysWeek, MemoNumbersWeek } from '../components/CalendarScreens';
import { Text, View } from '../components/ThemesAndStyles';
import { globalStyles } from '../globalStyles';
import { RootStackScreenProps } from '../types';

export const DayScreen: FC<RootStackScreenProps<'Day'>> = ({ route, navigation }) => {
  const { selectedDate } = route.params;

  const dateTime = DateTime.fromMillis(selectedDate);

  const titleFullDate = dateTime.toFormat('EEEE d MMMM yyyy');

  useLayoutEffect(() => {
    navigation.setOptions({ headerBackTitle: dateTime.monthLong });
  }, [navigation]);

  return (
    <View style={[globalStyles.container]}>
      <DaysWeek />
      <MemoNumbersWeek fullDate={selectedDate} selectedDay={dateTime.day} />
      <Text style={styles.titleFullDate}>{titleFullDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  titleFullDate: {
    fontSize: 16,
    textAlign: 'center',
  },
});
