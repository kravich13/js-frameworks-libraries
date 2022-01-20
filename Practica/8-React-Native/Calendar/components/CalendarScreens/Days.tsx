import _ from 'lodash';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { IDays_Props } from '../../interfaces';
import { View } from '../ThemesAndStyles';
import { Day } from './Day';

const MemoDays: FC<IDays_Props> = ({ days, isCurrentMonth, littleDay }) => {
  const lastDaysWeeks = useMemo(() => _.range(7, days.length + 1, 7), [days.length]);

  const renderItem = useCallback((day: number, index: number) => {
    return (
      <Day
        day={day}
        isCurrentMonth={isCurrentMonth}
        littleDay={littleDay}
        dayOff={lastDaysWeeks.includes(index + 1) || lastDaysWeeks.includes(index + 2)}
        key={String(index)}
      />
    );
  }, []);

  return <View style={styles.container}>{days.map(renderItem)}</View>;
};

export const Days = memo(MemoDays);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
