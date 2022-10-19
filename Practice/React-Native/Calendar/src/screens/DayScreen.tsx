import { DateTime } from 'luxon';
import React, { FC, useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { DaysWeek, NumbersWeek } from '../components/CalendarScreens';
import { Text, View } from '../components/ThemesAndStyles';
import { globalStyles } from '../globalStyles';
import { RootStackScreenProps } from '../types';

export const DayScreen: FC<RootStackScreenProps<'Day'>> = ({ route, navigation }) => {
  const { selectedDate } = route.params;

  const [currentDate, setCurrentDate] = useState(0);

  const dateTime = DateTime.fromMillis(currentDate || selectedDate);

  const titleFullDate = dateTime.toFormat('EEEE d MMMM yyyy');

  useLayoutEffect(() => {
    navigation.setOptions({ headerBackTitle: dateTime.monthLong });
  }, [navigation]);

  const setSelectedDate = useCallback(
    (clickWeekDay: number) => {
      const weekDay = dateTime.weekday;

      if (clickWeekDay < weekDay) {
        const localDate = dateTime.minus({ days: weekDay - clickWeekDay });
        setCurrentDate(localDate.toMillis());
      }

      if (clickWeekDay > weekDay) {
        const localDate = dateTime.plus({ days: clickWeekDay - weekDay });
        setCurrentDate(localDate.toMillis());
      }
    },
    [dateTime]
  );

  return (
    <View style={[globalStyles.container]}>
      <DaysWeek />
      <NumbersWeek fullDate={currentDate || selectedDate} setSelectedDate={setSelectedDate} />
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
