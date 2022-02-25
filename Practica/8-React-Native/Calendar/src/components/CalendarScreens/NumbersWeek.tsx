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

const MemoNumbersWeek: FC<INumbersWeek_Props> = ({ fullDate, setSelectedDate }) => {
  const backgroundColor = useThemeColor({ light: light.text, dark: dark.text }, 'text');
  const textColor = useThemeColor({ light: dark.text, dark: light.text }, 'text');

  const dateTime = DateTime.fromMillis(fullDate);
  const { numbersList, isCurrentDayInList } = useMemo(() => numbersWeekState(dateTime), [dateTime]);

  const isCurrentDay = DateTime.now().toFormat('yyyy LLL dd') === dateTime.toFormat('yyyy LLL dd');

  const renderItem = useCallback(
    (day: number, index: number) => {
      const dayOff = index === 5 || index === 6;
      const selectedDay = dateTime.day === day;

      const currentDaySelected = selectedDay && isCurrentDay;
      const selectedDayNotCurrent = selectedDay && !isCurrentDay;

      return (
        <TouchableOpacity
          style={[styles.containerTouch]}
          key={String(index)}
          activeOpacity={0.5}
          onPress={() => setSelectedDate(index + 1)}
        >
          <View
            style={[
              globalStyles.containerDay,
              !!currentDaySelected && globalStyles.currentDayBackground,
              selectedDayNotCurrent && { borderRadius: 50, backgroundColor },
            ]}
          >
            <Text
              style={[
                styles.text,
                dayOff && globalStyles.dayOff,
                selectedDayNotCurrent && { color: textColor },
                isCurrentDayInList === day && globalStyles.currentDayColor,
              ]}
            >
              {day}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [dateTime]
  );

  return <View style={styles.container}>{numbersList.map(renderItem)}</View>;
};

export const NumbersWeek = memo(MemoNumbersWeek);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  containerTouch: {
    flex: 1,
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
