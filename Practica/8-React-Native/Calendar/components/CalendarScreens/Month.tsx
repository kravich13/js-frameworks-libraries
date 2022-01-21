import { useNavigation } from '@react-navigation/native';
import { DateTime } from 'luxon';
import { customAlphabet } from 'nanoid/non-secure';
import React, { FC, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IMonth_DayState, IMonth_Props } from '../../interfaces';
import { Days } from './Days';
import { MonthName } from './MonthName';

const nanoid = customAlphabet('skrkyokyti5udnshgwg', 10);

const daysMonth = (monthNumber: number) => {
  const state: IMonth_DayState[] = [];

  const firstDate = DateTime.utc(DateTime.now().year, monthNumber, 1);

  const daysInMonth = firstDate.daysInMonth;
  const lastDay = firstDate.weekday + daysInMonth;
  const dayWeekLastDay = firstDate.set({ day: daysInMonth }).weekday;
  const totalNumberDays = 7 - dayWeekLastDay + lastDay - 1;

  let numberDay = 1;

  for (let i = 1; i <= totalNumberDays; i++) {
    if (i >= firstDate.weekday && i < lastDay) {
      state.push({ id: nanoid(), day: numberDay++ });
    } else {
      state.push({ id: nanoid(), day: 0 });
    }
  }

  return state;
};

export const Month: FC<IMonth_Props> = ({ monthNumber, littleMonth }) => {
  const navigation = useNavigation();
  const days = useMemo(() => daysMonth(monthNumber), [monthNumber]);

  const currentYear = DateTime.now().year;
  const firstDate = DateTime.utc(currentYear, monthNumber, 1);
  const monthName = firstDate.toFormat('LLL');
  const firstDayWeek = firstDate.weekday;

  const isCurrentMonth = DateTime.now().month === monthNumber;

  const onPress = () => {
    navigation.navigate('Month', { selectedMonth: monthNumber });
  };

  return (
    <TouchableOpacity disabled={!littleMonth} style={littleMonth && styles.container} activeOpacity={0.5} onPress={onPress}>
      <MonthName littleMonth={littleMonth} isCurrentMonth={isCurrentMonth} title={monthName} firstDayWeek={firstDayWeek} />

      <Days days={days} isCurrentMonth={isCurrentMonth} littleDay={littleMonth} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '32%',
    height: 145,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
