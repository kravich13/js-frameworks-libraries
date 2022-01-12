import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';
import { View, Text } from '../Themed';

const { dark, light } = Colors;

export const Week: FC<any> = ({}) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  currentMonth: {
    color: '#ff4500',
    fontWeight: '600',
  },
  text: {
    fontSize: 20,
  },
});
