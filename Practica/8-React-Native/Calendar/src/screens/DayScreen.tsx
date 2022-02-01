import { DateTime } from 'luxon';
import React, { FC, useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { DaysWeek, NumbersWeek } from '../components/CalendarScreens';
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
      <NumbersWeek fullDate={selectedDate} selectedDay={dateTime.day} />
      <Text style={styles.titleFullDate}>{titleFullDate}</Text>

      <View>
        <Text>To make an appointment 1</Text>
        <Text>To make an appointment 2</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  titleFullDate: {
    fontSize: 16,
    paddingBottom: 10,
    textAlign: 'center',
  },
});
