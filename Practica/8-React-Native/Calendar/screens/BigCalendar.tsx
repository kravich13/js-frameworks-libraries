import { DateTime } from 'luxon';
import React, { FC, useCallback, useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { Quarter } from '../components/BigCalendarScreen/Quarter';
import { ScrollView, Text, View } from '../components/Themed';
import { Colors } from '../constants';
import { globalStyles } from '../globalStyles';

const { dark, light } = Colors;

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const BigCalendar: FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await wait(2000);
    setRefreshing(false);
  }, []);

  const quarters: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ];

  const currentYear = DateTime.now().year;

  return (
    <ScrollView
      contentContainerStyle={[globalStyles.container]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={[styles.textYear]}>{currentYear}</Text>

      <View style={[styles.breakYear]} lightColor={light.container} darkColor={dark.container} />

      <View style={styles.calendar} lightColor={light.container} darkColor={dark.container}>
        {quarters.map((quarter, index) => {
          return <Quarter quarter={quarter} key={String(index)} />;
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  textYear: {
    color: '#ff4500',
    fontWeight: '600',
    fontSize: 35,
  },
  breakYear: {
    height: 1,
    marginBottom: 20,
  },
  calendar: {
    height: '75%',
  },
});
