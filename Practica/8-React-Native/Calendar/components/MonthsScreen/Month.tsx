import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';
import { IMonth_Props } from '../../interfaces';
import { View, Text } from '../Themed';
import { DateTime } from 'luxon';

const { dark, light } = Colors;

export const Month: FC<IMonth_Props> = ({ monthNumber }) => {
  const monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = monthNames[monthNumber];

  const monthTitle = new Date().getUTCMonth() === monthNumber;

  console.log(DateTime.now());

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, monthTitle ? styles.currentMonth : {}]}>{monthName}</Text>
      </View>

      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '31%',
  },
  currentMonth: {
    color: '#ff4500',
    fontWeight: '600',
  },
  text: {
    fontSize: 20,
  },
});
