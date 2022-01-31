import { DateTime } from 'luxon';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants';
import { globalStyles } from '../../globalStyles';
import { useThemeColor } from '../../hooks';
import { INumbersWeek_Props } from '../../interfaces';
import { numbersWeekState } from '../../scripts';
import { Text, View } from '../ThemesAndStyles';

const { dark, light } = Colors;

export const MemoNumbersWeek: FC<INumbersWeek_Props> = ({ fullDate, selectedDay }) => {
  const backgroundColor = useThemeColor({ light: light.text, dark: dark.text }, 'text');
  const textColor = useThemeColor({ light: dark.text, dark: light.text }, 'text');

  const dateTime = DateTime.fromMillis(fullDate);
  const numbersList = useMemo(() => numbersWeekState(dateTime), [dateTime]);

  const dateNow = DateTime.now();

  const isCurrentDay = dateNow.toFormat('yyyy LLL dd') === dateTime.toFormat('yyyy LLL dd');
  const weekDay = dateTime.weekday;
  let isCurrentDayInList = false;

  let posStart = 1;

  for (let i = 1; i <= 7; i++) {
    if (i < weekDay) {
      const localDate = dateTime.minus({ days: i });
      isCurrentDayInList = dateNow.toFormat('yyyy LLL dd') === localDate.toFormat('yyyy LLL dd');
    } else if (i > weekDay) {
      const localDate = dateTime.plus({ days: posStart++ });
      isCurrentDayInList = dateNow.toFormat('yyyy LLL dd') === localDate.toFormat('yyyy LLL dd');
    }
  }

  console.log(isCurrentDay);

  const renderItem = useCallback((day: number, index: number) => {
    const dayOff = index === 5 || index === 6;
    const currentDay = isCurrentDay && dateTime.day === day;
    const currentDaySelected = currentDay && selectedDay;
    const notCurrentDaySelected = selectedDay === day && !currentDaySelected;

    return (
      <TouchableOpacity style={[styles.containerTouch]} key={String(index)} activeOpacity={0.5}>
        <View
          style={[!!currentDaySelected && styles.selectedDay, notCurrentDaySelected && { borderRadius: 50, backgroundColor }]}
        >
          <Text style={[styles.text, dayOff && globalStyles.dayOff, notCurrentDaySelected && { color: textColor }]}>{day}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return <View style={styles.container}>{numbersList.map(renderItem)}</View>;
};

export const NumbersWeek = memo(MemoNumbersWeek);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    borderColor: 'red',
  },

  containerTouch: {
    flex: 1,
    alignItems: 'center',
  },

  selectedDay: {
    borderRadius: 50,
    backgroundColor: '#ff4500',
  },

  text: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: '600',
  },
});
