import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { IWeek_Props } from '../../interfaces';
import { View } from '../Themed';
import { Day } from './Day';

export const Week: FC<IWeek_Props> = ({ week, isCurrentMonth }) => {
  return (
    <View style={styles.container}>
      {week.map((day, index) => {
        return <Day day={day} isCurrentMonth={isCurrentMonth} key={String(index)} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
});
