import { useNavigation } from '@react-navigation/native';
import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { Button, RefreshControl, StyleSheet } from 'react-native';
import { Quarter } from '../components/CalendarScreens/Quarter';
import { ScrollView, Text, View } from '../components/ThemesAndStyles/Themed';
import { Colors } from '../constants';
import { globalStyles } from '../globalStyles';
import { useRefreshing } from '../hooks';

const { dark, light } = Colors;

export const BigCalendar: FC<any> = () => {
  const navigation = useNavigation();
  const refreshing = useRefreshing();

  const quarters = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ];

  const currentYear = DateTime.now().year;

  const renderItem = (quarter: number[], index: number) => {
    return <Quarter quarter={quarter} key={String(index)} />;
  };

  const onPress = () => {
    console.log('tut');
    navigation.navigate('Month');
  };

  return (
    <ScrollView
      contentContainerStyle={[globalStyles.container, styles.container]}
      refreshControl={<RefreshControl {...refreshing} />}
    >
      <Button title="Go month" onPress={() => navigation.navigate('Month')} />
      <Text style={[styles.textYear]} onPress={onPress}>
        {currentYear}
      </Text>

      <View style={[styles.breakYear]} lightColor={light.container} darkColor={dark.container} />

      <View style={styles.calendar} lightColor={light.container} darkColor={dark.container}>
        {quarters.map(renderItem)}
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
  calendar: {},
});
