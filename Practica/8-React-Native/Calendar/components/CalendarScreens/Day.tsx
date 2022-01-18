import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { IDay_Props } from '../../interfaces';
import { Text, View } from '../ThemesAndStyles/Themed';

export const Day: FC<IDay_Props> = ({ day, isCurrentMonth, littleDay }) => {
  const isCurrentDay = DateTime.now().day === day && isCurrentMonth;
  const titleDay = day || '';

  if (littleDay) {
    return (
      <View style={[isCurrentDay ? sharedStyles.currentDay : {}, littleStyles.container]}>
        <Text style={littleStyles.text}>{titleDay}</Text>
      </View>
    );
  }

  return (
    <View style={[bigStyles.container, titleDay ? bigStyles.isNumber : {}]}>
      <View style={isCurrentDay ? sharedStyles.currentDay : {}}>
        <Text style={bigStyles.text}>{titleDay}</Text>
      </View>
    </View>
  );
};

const sharedStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentDay: {
    backgroundColor: '#ff4500',
    borderRadius: 50,
  },
});

const littleStyles = StyleSheet.create({
  container: {
    ...sharedStyles.container,
    width: `${(100 / 7).toFixed()}%`,
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
    width: `${100 / 7}%`,
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
