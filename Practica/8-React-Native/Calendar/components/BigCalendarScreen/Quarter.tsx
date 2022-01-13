import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { IQuarter_Props } from '../../interfaces';
import { View } from '../Themed';
import { Month } from './Month';

export const Quarter: FC<IQuarter_Props> = ({ quarter }) => {
  return (
    <View style={styles.container}>
      {quarter.map((month, index) => {
        return <Month monthNumber={month} key={String(index)} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
