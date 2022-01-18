import React, { FC, memo, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { IDays_Props } from '../../interfaces';
import { View } from '../ThemesAndStyles/Themed';
import { Day } from './Day';

const MemoDays: FC<IDays_Props> = ({ days, isCurrentMonth, littleDay }) => {
  const renderItem = useCallback((day: number, index: number) => {
    return <Day day={day} isCurrentMonth={isCurrentMonth} littleDay={littleDay} key={String(index)} />;
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
