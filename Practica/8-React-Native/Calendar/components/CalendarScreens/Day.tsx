import { useNavigation } from '@react-navigation/native';
import { DateTime } from 'luxon';
import React, { FC, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants';
import { globalStyles } from '../../globalStyles';
import { useThemeColor } from '../../hooks';
import { IDay_Props } from '../../interfaces';
import { Text, View } from '../ThemesAndStyles';

const { dark, light } = Colors;

export const Day: FC<IDay_Props> = ({ fullDate, littleDay, dayOff }) => {
  const navigation = useNavigation();

  const borderTopColor = useThemeColor({ light: light.container, dark: dark.container }, 'background');

  const dateTime = fullDate ? DateTime.fromMillis(fullDate) : null;
  const isCurrentDay = DateTime.now().toFormat('yyyy LLL dd') === dateTime?.toFormat('yyyy LLL dd');
  const titleDay = dateTime?.day || '';

  const onPress = useCallback(() => {
    navigation.navigate('Day', { selectedDate: fullDate });
  }, []);

  if (littleDay) {
    return (
      <View style={littleStyles.container}>
        <View style={[littleStyles.containerDay, isCurrentDay && globalStyles.currentDay]}>
          <Text style={littleStyles.text}>{titleDay}</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[bigStyles.container, !!titleDay && { borderTopColor, borderTopWidth: 1 }]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <View style={[globalStyles.containerDay, isCurrentDay && globalStyles.currentDay]}>
        <Text style={[bigStyles.text, dayOff && globalStyles.dayOff]}>{titleDay}</Text>
      </View>
    </TouchableOpacity>
  );
};

const sharedStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const littleStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 1,
  },

  containerDay: {
    ...sharedStyles.container,
    height: 16,
    width: 16,
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
    fontSize: 18,
    fontWeight: '600',
  },

  isNumber: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
});
