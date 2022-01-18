import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../ThemesAndStyles/Themed';

export const DaysWeek = () => {
  const daysWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const renderItem = useCallback((day: string, index: number) => {
    return (
      <Text style={styles.text} key={String(index)}>
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
