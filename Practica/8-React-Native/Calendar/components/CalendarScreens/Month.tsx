import { useNavigation } from '@react-navigation/native';
import { DateTime } from 'luxon';
import React, { FC, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IMonth_Props } from '../../interfaces';
import { daysMonthState } from '../../scripts';
import { Days } from './Days';
import { MonthName } from './MonthName';

export const Month: FC<IMonth_Props> = ({ fullDate, littleMonth }) => {
  const navigation = useNavigation();

  const dateTime = DateTime.fromMillis(fullDate);
  const days = useMemo(() => daysMonthState(dateTime), [dateTime]);

  const monthName = dateTime.toFormat('LLL');
  const firstDayWeek = dateTime.weekday;

  const isCurrentMonth = DateTime.now().toFormat('yyyy LLL') === dateTime?.toFormat('yyyy LLL');

  const onPress = () => {
    navigation.navigate('Month', { selectedDate: fullDate });
  };

  return (
    <TouchableOpacity disabled={!littleMonth} style={littleMonth && styles.container} activeOpacity={0.5} onPress={onPress}>
      <MonthName isCurrentMonth={isCurrentMonth} littleMonth={littleMonth} title={monthName} firstDayWeek={firstDayWeek} />

      <Days days={days} littleDay={littleMonth} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '32%',
    height: 145,
  },

  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
