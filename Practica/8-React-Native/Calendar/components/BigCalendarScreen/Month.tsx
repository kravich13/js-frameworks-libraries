import _ from 'lodash';
import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { IMonth_Props } from '../../interfaces';
import { Text, View } from '../Themed';
import { Week } from './Week';

export const Month: FC<IMonth_Props> = ({ monthNumber }) => {
  const monthlyCalendar: number[][] = [[], [], [], [], [], []];

  const currentYear = DateTime.now().year;
  const monthName = DateTime.utc(currentYear, monthNumber).toFormat('LLL');
  const firstDate = DateTime.utc(2022, monthNumber, 1);

  const isCurrentMonth = DateTime.now().month === monthNumber;

  const daysInMonth = firstDate.daysInMonth;
  const lastDay = firstDate.weekday + daysInMonth;
  const dayWeekLastDay = firstDate.set({ day: daysInMonth }).weekday;
  const totalNumberDays = 7 - dayWeekLastDay + lastDay;

  let numberDay = 1;
  let indexWeek = 0;

  for (let i = 1; i <= totalNumberDays; i++) {
    if (i >= firstDate.weekday && i < lastDay) {
      if (monthlyCalendar[indexWeek].length === 7) {
        monthlyCalendar[++indexWeek].push(numberDay++);
      } else {
        monthlyCalendar[indexWeek].push(numberDay++);
      }
    } else if (monthlyCalendar[indexWeek].length !== 7) {
      monthlyCalendar[indexWeek].push(0);
    }
  }

  _.remove(monthlyCalendar, (week) => !week.length);

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, isCurrentMonth ? styles.currentMonth : {}]}>{monthName}</Text>
      </View>

      <View>
        {monthlyCalendar.map((week, index) => {
          return <Week week={week} isCurrentMonth={isCurrentMonth} key={String(index)} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '32%',
  },
  currentMonth: {
    color: '#ff4500',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
