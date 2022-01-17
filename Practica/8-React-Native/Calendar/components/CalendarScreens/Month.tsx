import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IMonth_Props } from '../../interfaces';
import { Text, View } from '../ThemesAndStyles/Themed';
import { Week } from './Week';

export const Month: FC<IMonth_Props> = ({ monthNumber }) => {
  const navigation = useNavigation();

  const fullCalendar: number[][] = [[], [], [], [], [], []];

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
      if (fullCalendar[indexWeek].length === 7) {
        fullCalendar[++indexWeek].push(numberDay++);
      } else {
        fullCalendar[indexWeek].push(numberDay++);
      }
    } else if (fullCalendar[indexWeek].length !== 7) {
      fullCalendar[indexWeek].push(0);
    }
  }

  const readyCalendar = _.filter(fullCalendar, (week) => week.length) as number[][];

  const onPress = () => {
    navigation.navigate('Month');
  };

  const renderItem = (week: number[], index: number) => {
    return <Week week={week} isCurrentMonth={isCurrentMonth} key={String(index)} />;
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={onPress}>
      <View>
        <Text style={[styles.text, isCurrentMonth ? styles.currentMonth : {}]}>{monthName}</Text>
      </View>

      <View>{readyCalendar.map(renderItem)}</View>
    </TouchableOpacity>
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
