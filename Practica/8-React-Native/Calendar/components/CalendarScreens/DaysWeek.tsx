import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { globalStyles } from '../../globalStyles';
import { Text, View } from '../ThemesAndStyles';

export const DaysWeek = () => {
  const daysWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const renderItem = useCallback((day: string, index: number) => {
    const dayOff = index === 5 || index === 6;

    return (
      <Text style={[styles.text, dayOff && globalStyles.dayOff]} key={String(index)}>
        {day}
      </Text>
    );
  }, []);

  return <View style={styles.container}>{daysWeek.map(renderItem)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
  },
});
