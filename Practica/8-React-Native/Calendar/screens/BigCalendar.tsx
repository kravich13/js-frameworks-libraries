import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Quarter } from '../components/MonthsScreen/Quarter';
import { Text, View } from '../components/Themed';
import { Colors } from '../constants';
import { globalStyles } from '../globalStyles';

const { dark, light } = Colors;

export const BigCalendar: FC = () => {
  const quarters: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
  ];

  const currentYear = new Date().getUTCFullYear();

  return (
    <View style={[globalStyles.container]}>
      <Text style={[styles.textYear]}>{currentYear}</Text>

      <View style={[styles.breakYear]} lightColor={light.container} darkColor={dark.container} />

      <View style={styles.calendar} lightColor={light.container} darkColor={dark.container}>
        {quarters.map((quarter, index) => {
          return <Quarter quarter={quarter} key={String(index)} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textYear: {
    color: '#ff4500',
    fontWeight: '600',
    fontSize: 35,
  },
  breakYear: {
    height: 1,
    marginBottom: 20,
  },
  calendar: {
    height: '75%',
  },
});
