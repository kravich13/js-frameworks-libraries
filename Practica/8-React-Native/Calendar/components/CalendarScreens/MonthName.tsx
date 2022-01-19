import _ from 'lodash';
import React, { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { IMonthName_Props } from '../../interfaces';
import { Text, View } from '../ThemesAndStyles/Themed';

export const MonthName: FC<IMonthName_Props> = ({ littleMonth, title, isCurrentMonth, firstDayWeek }) => {
  const daysWeek = _.range(1, 8);

  const sharedStyles = [styles.text, isCurrentMonth ? styles.currentMonth : {}];

  const renderItem = useCallback(
    (dayNumber: number) => (
      <View style={styles.dayContainer} key={String(dayNumber)}>
        <Text style={[...sharedStyles]}>{dayNumber === firstDayWeek ? title : ''}</Text>
      </View>
    ),
    []
  );
  return (
    <View style={styles.container}>
      {littleMonth ? <Text style={[...sharedStyles]}>{title}</Text> : daysWeek.map(renderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dayContainer: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: `${100 / 7}%`,
  },
  currentMonth: {
    color: '#ff4500',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
