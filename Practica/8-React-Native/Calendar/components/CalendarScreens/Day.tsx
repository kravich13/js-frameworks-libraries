import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { IDay_Props } from '../../interfaces';
import { Text, View } from '../ThemesAndStyles/Themed';

export const Day: FC<IDay_Props> = ({ day, isCurrentMonth }) => {
  const isCurrentDay = DateTime.now().day === day && isCurrentMonth;
  const titleDay = day || '';

  return (
    <View style={[styles.container, isCurrentDay ? styles.currentDay : {}]}>
      <Text style={styles.text}>{titleDay}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 1,
    height: 18,
  },
  currentDay: {
    backgroundColor: '#ff4500',
    borderRadius: 50,
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
  },
});
