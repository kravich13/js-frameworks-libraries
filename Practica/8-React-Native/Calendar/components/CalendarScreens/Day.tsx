import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';
import { globalStyles } from '../../globalStyles';
import { useThemeColor } from '../../hooks';
import { IDay_Props } from '../../interfaces';
import { Text, View } from '../ThemesAndStyles';

const { dark, light } = Colors;

export const Day: FC<IDay_Props> = ({ day, isCurrentMonth, littleDay, dayOff }) => {
  const borderTopColor = useThemeColor({ light: light.container, dark: dark.container }, 'background');
  const isCurrentDay = DateTime.now().day === day && isCurrentMonth;
  const titleDay = day || '';

  if (littleDay) {
    return (
      <View style={[littleStyles.container, isCurrentDay && sharedStyles.currentDay]}>
        <Text style={littleStyles.text}>{titleDay}</Text>
      </View>
    );
  }

  return (
    <View style={[bigStyles.container, !!titleDay && { borderTopColor, borderTopWidth: 1 }]}>
      <View style={isCurrentDay && sharedStyles.currentDay}>
        <Text style={[bigStyles.text, dayOff && globalStyles.dayOff]}>{titleDay}</Text>
      </View>
    </View>
  );
};

const sharedStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  currentDay: {
    backgroundColor: '#ff4500',
    borderRadius: 50,
  },
});

const littleStyles = StyleSheet.create({
  container: {
    ...sharedStyles.container,
    height: 18,
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
  },
});

const bigStyles = StyleSheet.create({
  container: {
    ...sharedStyles.container,
    flex: 1,
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
  },
  text: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: '600',
  },
  isNumber: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
});
