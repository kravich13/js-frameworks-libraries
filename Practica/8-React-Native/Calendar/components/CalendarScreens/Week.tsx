import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { IWeek_Props } from '../../interfaces';
import { View } from '../ThemesAndStyles/Themed';
import { Day } from './Day';

export const Week: FC<IWeek_Props> = ({ week, isCurrentMonth }) => {
  const renderItem = (day: number, index: number) => {
    return <Day day={day} isCurrentMonth={isCurrentMonth} key={String(index)} />;
  };

  return <View style={styles.container}>{week.map(renderItem)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
});
