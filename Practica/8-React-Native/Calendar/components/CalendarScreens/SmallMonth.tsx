import { useNavigation } from '@react-navigation/native';
import _, { wrap } from 'lodash';
import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { IMonth_Props } from '../../interfaces';
import { Text, View } from '../ThemesAndStyles/Themed';

export const SmallMonth: FC<IMonth_Props> = ({ monthNumber }) => {
  const navigation = useNavigation();

  const fullCalendar: number[] = [];
  const newWeeksIndices: number[] = [];

  const currentYear = DateTime.now().year;
  const monthName = DateTime.utc(currentYear, monthNumber).toFormat('LLL');
  const firstDate = DateTime.utc(2022, monthNumber, 1);

  const isCurrentMonth = DateTime.now().month === monthNumber;

  const daysInMonth = firstDate.daysInMonth;
  const lastDay = firstDate.weekday + daysInMonth;
  const dayWeekLastDay = firstDate.set({ day: daysInMonth }).weekday;
  const totalNumberDays = 7 - dayWeekLastDay + lastDay - 1;

  let numberDay = 1;
  let indexWeek = 0;

  for (let i = 1; i < 7; i++) {
    newWeeksIndices.push(i * 7);
  }

  for (let i = 1; i <= totalNumberDays; i++) {
    if (i >= firstDate.weekday && i < lastDay) {
      fullCalendar.push(numberDay++);
    } else {
      fullCalendar.push(0);
    }
  }

  const renderItem = (elem: number, index: number) => {
    return (
      <View style={styles.day} key={String(index)}>
        <Text style={styles.textDay}>{elem}</Text>
      </View>
    );
  };

  // const keyExtractor = (item: number, index: number) => String(index);

  return (
    <View>
      <View>
        <Text style={[styles.textВфн, isCurrentMonth ? styles.currentMonth : {}]}>{monthName}</Text>
      </View>

      <View style={styles.month}>
        {fullCalendar.map(renderItem)}
        {/* <FlatList data={fullCalendar} renderItem={renderItem} keyExtractor={keyExtractor} /> */}
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
  textВфн: {
    fontSize: 20,
    fontWeight: '600',
  },
  month: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
    width: `${100 / 7}%`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDay: {
    fontSize: 18,
    fontWeight: '600',
  },
});
