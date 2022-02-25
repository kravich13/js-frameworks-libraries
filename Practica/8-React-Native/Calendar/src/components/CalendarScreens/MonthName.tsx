import _ from 'lodash';
import React, { FC, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { globalStyles } from '../../globalStyles';
import { IMonthName_Props } from '../../interfaces';
import { Text, View } from '../ThemesAndStyles';

export const MonthName: FC<IMonthName_Props> = ({ littleMonth, title, isCurrentMonth, firstDayWeek }) => {
  const daysWeek = useMemo(() => _.range(1, 8), []);

  const sharedStyles = [styles.text, isCurrentMonth && globalStyles.currentDayColor];

  const renderItem = useCallback(
    (dayNumber: number) => (
      <View style={styles.dayContainer} key={String(dayNumber)}>
        <Text style={[...sharedStyles]}>{dayNumber === firstDayWeek ? title : ''}</Text>
      </View>
    ),
    []
  );
  return (
    <View style={styles.container}>
      {littleMonth ? <Text style={[...sharedStyles]}>{title}</Text> : daysWeek.map(renderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  dayContainer: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: `${100 / 7}%`,
  },

  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});
