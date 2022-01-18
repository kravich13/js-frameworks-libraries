import { useNavigation } from '@react-navigation/native';
import { DateTime } from 'luxon';
import React, { FC, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IMonth_Props } from '../../interfaces';
import { Text, View } from '../ThemesAndStyles/Themed';
import { Days } from './Days';

const daysMonth = (monthNumber: number) => {
  const state: number[] = [];

  const firstDate = DateTime.utc(2022, monthNumber, 1);

  const daysInMonth = firstDate.daysInMonth;
  const lastDay = firstDate.weekday + daysInMonth;
  const dayWeekLastDay = firstDate.set({ day: daysInMonth }).weekday;
  const totalNumberDays = 7 - dayWeekLastDay + lastDay - 1;

  let numberDay = 1;

  for (let i = 1; i <= totalNumberDays; i++) {
    if (i >= firstDate.weekday && i < lastDay) {
      state.push(numberDay++);
    } else {
      state.push(0);
    }
  }

  return state;
};

export const Month: FC<IMonth_Props> = ({ monthNumber, littleMonth }) => {
  const navigation = useNavigation();

  const days = useMemo(() => daysMonth(monthNumber), [monthNumber]);

  const currentYear = DateTime.now().year;
  const monthName = DateTime.utc(currentYear, monthNumber).toFormat('LLL');
  const isCurrentMonth = DateTime.now().month === monthNumber;

  const onPress = () => {
    navigation.navigate('Month');
  };

  return (
    <TouchableOpacity
      disabled={!littleMonth}
      style={littleMonth ? styles.littleContainer : styles.bigContainer}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.text, isCurrentMonth ? styles.currentMonth : {}]}>{monthName}</Text>
      </View>

      <Days days={days} isCurrentMonth={isCurrentMonth} littleDay={littleMonth} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  littleContainer: {
    width: `32%`,
    height: 145,
  },
  bigContainer: {},
  month: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  currentMonth: {
    color: '#ff4500',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
